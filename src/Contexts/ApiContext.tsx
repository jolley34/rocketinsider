import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import config from "../config/config";

// En TypeScript-interface som definierar strukturen för insidertransaktionsdata.
interface TransactionData {
  name: string;
  share: number;
  change: number;
  transactionDate: string;
  transactionCode: string;
  transactionPrice: number;
  currency: string;
  symbol: string;
  totalAmount: number;
  companyName: string;
  logo: string;
}

// En TypeScript-interface som definierar strukturen för context-värdet.
interface ContextValue {
  transactionData: TransactionData[];
}

// Skapa en context för att dela data mellan olika komponenter.
const ApiContext = createContext<ContextValue>({ transactionData: [] });

// En asynkron funktion för att hämta insidertransaktionsdata från en extern API-tjänst.
async function fetchData(symbol: string): Promise<TransactionData[]> {
  // Använder en API-nyckel från en konfigurationsfil.
  const apiKey = config.apiKey;
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`
  );
  const responseData = await response.json();
  // Filtrera och returnera endast köp (P) och försäljning (S) transaktioner.
  return responseData.data.filter((transaction: TransactionData) =>
    ["P", "S"].includes(transaction.transactionCode)
  );
}

// Funktion för att slå ihop och sammanfoga transaktioner baserat på namn och transaktionskod.
function mergeTransactions(transactions: TransactionData[]): TransactionData[] {
  // En objektstruktur för att lagra sammanfogad data.
  const summaryData: { [key: string]: TransactionData } = {};
  transactions.forEach((transaction: TransactionData) => {
    const key = `${transaction.name}-${transaction.transactionCode}`;
    if (summaryData[key]) {
      // Uppdatera sammanfogad data med ny information från varje transaktion.
      summaryData[key].totalAmount += Math.round(
        transaction.change * transaction.transactionPrice
      );
      summaryData[key].change += transaction.change;
      if (
        !summaryData[key].transactionDate.includes(transaction.transactionDate)
      ) {
        summaryData[key].transactionDate += ` / ${transaction.transactionDate}`;
      }
    } else {
      // Skapa ny post i objektet om det inte finns någon matchande nyckel.
      summaryData[key] = {
        ...transaction,
        totalAmount: Math.round(
          transaction.change * transaction.transactionPrice
        ),
      };
    }
  });
  // Returnera en array av sammanfogade transaktioner.
  return Object.values(summaryData);
}

// Funktion för att hämta företagsprofil baserat på aktiesymbol.
async function getCompanyProfile(symbol: string) {
  const apiKey = config.apiKey;
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
  );
  const responseData = await response.json();
  return {
    name: responseData.name,
    logo: responseData.logo, // Lägg till logotypen här
  };
}

// Funktion för att sortera och filtrera transaktionsdata baserat på köp, försäljning eller inget specifierat.
async function sortAndFilterData(
  transactionData: TransactionData[],
  purchaseType: string | null
): Promise<TransactionData[]> {
  let filteredData: TransactionData[] = [...transactionData];

  if (purchaseType === "sell") {
    // Filtrera och sortera försäljningstransaktioner och returnera de tre första.
    filteredData = filteredData
      .filter((transaction) => transaction.transactionCode === "S")
      .sort((a, b) => a.totalAmount - b.totalAmount)
      .slice(0, 3);
  } else if (purchaseType === "purchase") {
    // Filtrera och sortera köpstransaktioner och returnera de tre första.
    filteredData = filteredData
      .filter((transaction) => transaction.transactionCode === "P")
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 3);
  } else {
    // Om ingen typ har angetts, returnera bara de första 3 transaktionerna.
    filteredData = filteredData.slice(0, 3);
  }

  // Hämta företagsnamn och logotyper för de filtrerade transaktionerna.
  const transactionsWithCompanyData = await Promise.all(
    filteredData.map(async (transaction) => {
      const companyProfile = await getCompanyProfile(transaction.symbol);
      return {
        ...transaction,
        companyName: companyProfile.name,
        logo: companyProfile.logo, // Lägg till logotypen här
      };
    })
  );

  return transactionsWithCompanyData;
}

// En React-komponent för att tillhandahålla API-data via context.
function ApiProvider(props: PropsWithChildren<{}>) {
  // Använd React Hook för att få tillgång till sökparametrar från URL:en.
  const [searchParams] = useSearchParams();
  // State Hooks för att lagra olika typer av data.
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);
  const [cachedCompanyProfiles, setCachedCompanyProfiles] = useState<{
    [symbol: string]: any;
  }>({});

  // Effektfunktion som körs vid montering för att hämta och sätta transaktionsdata.
  useEffect(() => {
    async function fetchDataAndSetTransactionData() {
      try {
        const data = await fetchData("");
        const mergedData = mergeTransactions(data);
        setTransactionData(mergedData);
      } catch (error) {
        console.error("Kan inte hitta data", error);
      }
    }
    fetchDataAndSetTransactionData();
  }, []);

  // Funktion för att hämta företagsprofil från cachade data eller via nätverksförfrågan.
  async function getCompanyProfileWithCache(symbol: string) {
    if (cachedCompanyProfiles[symbol]) {
      return cachedCompanyProfiles[symbol];
    } else {
      const companyProfile = await getCompanyProfile(symbol);
      setCachedCompanyProfiles((prevState) => ({
        ...prevState,
        [symbol]: companyProfile,
      }));
      return companyProfile;
    }
  }

  // Effektfunktion som körs vid förändringar i transaktionsdata eller sökparametrar.
  useEffect(() => {
    const purchaseType = searchParams.get("type");
    async function updateFilteredData() {
      const companyNames = await sortAndFilterData(
        transactionData,
        purchaseType
      );
      // Använd cachad företagsprofil istället för att göra en ny förfrågan.
      const transactionsWithCompanyData = await Promise.all(
        companyNames.map(async (transaction) => {
          const companyProfile = await getCompanyProfileWithCache(
            transaction.symbol
          );
          return {
            ...transaction,
            companyName: companyProfile.name,
          };
        })
      );
      setFilteredData(transactionsWithCompanyData);
    }
    updateFilteredData();
  }, [transactionData, searchParams]);

  // Returnera ApiContext.Provider med det filtrerade dataobjektet.
  return (
    <ApiContext.Provider value={{ transactionData: filteredData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

// En Hook-funktion för att konsumera API-context i andra komponenter.
export const useApi = () => useContext(ApiContext);

export default ApiProvider;

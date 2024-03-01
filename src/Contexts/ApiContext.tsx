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
  currentPrice: number;
}

// En TypeScript-interface som definierar strukturen för context-värdet.
interface ContextValue {
  transactionData: TransactionData[];
}

// Skapa en context för att dela data mellan olika komponenter.
const ApiContext = createContext<ContextValue>({ transactionData: [] });

// En asynkron funktion för att hämta insidertransaktionsdata från en extern API-tjänst.
async function getInsideTransactions(
  symbol: string
): Promise<TransactionData[]> {
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

// Funktion för att hämta företagsprofil baserat på aktiesymbol.
async function getCompanyProfile(symbol: string) {
  const apiKey = config.apiKey;
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
  );
  const responseData = await response.json();
  return {
    name: responseData.name,
    logo: responseData.logo,
  };
}

// Funktion för att hämta aktuellt pris från Finnhub's Quote API baserat på symbol.
async function getCurrentPrice(symbol: string): Promise<number> {
  const apiKey = config.apiKey;
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
  );
  const responseData = await response.json();
  return responseData.c; // Returnera det aktuella priset från API-svar.
}

// Funktion för att slå ihop och sammanfoga transaktioner baserat på namn och transaktionskod.
function mergeTransactions(transactions: TransactionData[]): TransactionData[] {
  // En objektstruktur för att lagra sammanfogad data.
  const mergedData: { [key: string]: TransactionData } = {};
  transactions.forEach((transaction: TransactionData) => {
    const key = `${transaction.name}-${transaction.transactionCode}`;
    if (mergedData[key]) {
      // Uppdatera sammanfogad data med ny information från varje transaktion.
      mergedData[key].totalAmount += Math.round(
        transaction.change * transaction.transactionPrice
      );
      mergedData[key].change += transaction.change;
      if (
        !mergedData[key].transactionDate.includes(transaction.transactionDate)
      ) {
        mergedData[key].transactionDate += ` / ${transaction.transactionDate}`;
      }
    } else {
      // Skapa ny post i objektet om det inte finns någon matchande nyckel.
      mergedData[key] = {
        ...transaction,
        totalAmount: Math.round(
          transaction.change * transaction.transactionPrice
        ),
      };
    }
  });
  // Returnera en array av sammanfogade transaktioner.
  return Object.values(mergedData);
}

// Funktion för att sortera och filtrera transaktionsdata baserat på köp, försäljning eller inget specifierat.
async function sortAndFilterData(
  transactionData: TransactionData[],
  purchaseType: string | null
): Promise<TransactionData[]> {
  let filteredData: TransactionData[] = [...transactionData];

  if (purchaseType === "sell") {
    filteredData = filteredData
      .filter((transaction) => transaction.transactionCode === "S")
      .sort((a, b) => a.totalAmount - b.totalAmount)
      .slice(0, 3);
  } else if (purchaseType === "purchase") {
    filteredData = filteredData
      .filter((transaction) => transaction.transactionCode === "P")
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 3);
  } else {
    filteredData = filteredData.slice(0, 3);
  }

  return filteredData;
}

async function getDataFromFilterData(
  filteredData: TransactionData[]
): Promise<TransactionData[]> {
  const transactionsWithCompanyData = await Promise.all(
    filteredData.map(async (transaction) => {
      const companyProfile = await getCompanyProfile(transaction.symbol);
      const currentPrice = await getCurrentPrice(transaction.symbol);
      return {
        ...transaction,
        companyName: companyProfile.name,
        logo: companyProfile.logo,
        currentPrice: currentPrice,
      };
    })
  );
  console.log(transactionsWithCompanyData);

  return transactionsWithCompanyData; // Glöm inte att returnera resultatet
}

// En React-komponent för att tillhandahålla API-data via context.
function ApiProvider(props: PropsWithChildren<{}>) {
  // Använd React Hook för att få tillgång till sökparametrar från URL:en.
  const [searchParams] = useSearchParams();
  // State Hooks för att lagra olika typer av data.
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [summaryData, setSummarydData] = useState<TransactionData[]>([]);

  // Effektfunktion som körs vid montering för att hämta och sätta transaktionsdata.
  useEffect(() => {
    async function fetchDataAndSetTransactionData() {
      try {
        const data = await getInsideTransactions("");
        const mergedData = mergeTransactions(data);
        setTransactionData(mergedData);
      } catch (error) {
        console.error("Kan inte hitta data", error);
      }
    }
    fetchDataAndSetTransactionData();
  }, []);

  // Effektfunktion som körs vid förändringar i transaktionsdata eller sökparametrar.
  useEffect(() => {
    const purchaseType = searchParams.get("type");
    async function updateFilteredData() {
      const filteredTransactions = await sortAndFilterData(
        transactionData,
        purchaseType
      );
      // Anropa getDataFromFilterData för att få bearbetad data
      const processedData = await getDataFromFilterData(filteredTransactions);
      // Uppdatera filteredData med den bearbetade datan
      setSummarydData(processedData);
    }
    updateFilteredData();
  }, [transactionData, searchParams]);

  // Returnera ApiContext.Provider med det filtrerade dataobjektet.
  return (
    <ApiContext.Provider value={{ transactionData: summaryData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

// En Hook-funktion för att konsumera API-context i andra komponenter.
export const useApi = () => useContext(ApiContext);

export default ApiProvider;

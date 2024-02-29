import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import config from "../config/config";

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
}

interface ContextValue {
  transactionData: TransactionData[];
}

const ApiContext = createContext<ContextValue>({ transactionData: [] });

async function fetchData(symbol: string): Promise<TransactionData[]> {
  const apiKey = config.apiKey;
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`
  );
  const responseData = await response.json();
  return responseData.data.filter((transaction: TransactionData) =>
    ["P", "S"].includes(transaction.transactionCode)
  );
}

function mergeTransactions(transactions: TransactionData[]): TransactionData[] {
  const summaryData: { [key: string]: TransactionData } = {};
  transactions.forEach((transaction: TransactionData) => {
    const key = `${transaction.name}-${transaction.transactionCode}`;
    if (summaryData[key]) {
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
      summaryData[key] = {
        ...transaction,
        totalAmount: Math.round(
          transaction.change * transaction.transactionPrice
        ),
      };
    }
  });
  return Object.values(summaryData);
}

async function getCompanyProfile(symbol: string) {
  const apiKey = config.apiKey;
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
  );
  const responseData = await response.json();
  return responseData;
}

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
    // Om ingen typ har angetts, returnera bara de första 3 transaktionerna
    filteredData = filteredData.slice(0, 3);
  }

  // Hämta och lägg till företagsnamnen för de filtrerade transaktionerna
  const transactionsWithCompanyNames = await Promise.all(
    filteredData.map(async (transaction) => {
      const companyProfile = await getCompanyProfile(transaction.symbol);
      return {
        ...transaction,
        companyName: companyProfile.name,
      };
    })
  );

  return transactionsWithCompanyNames;
}

function ApiProvider(props: PropsWithChildren<{}>) {
  const [searchParams] = useSearchParams();
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);
  const [cachedCompanyProfiles, setCachedCompanyProfiles] = useState<{
    [symbol: string]: any;
  }>({});

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

  useEffect(() => {
    const purchaseType = searchParams.get("type");
    async function updateFilteredData() {
      const companyNames = await sortAndFilterData(
        transactionData,
        purchaseType
      );
      // Använd cachad företagsprofil istället för att göra en ny förfrågan
      const transactionsWithCompanyNames = await Promise.all(
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
      setFilteredData(transactionsWithCompanyNames);
    }
    updateFilteredData();
  }, [transactionData, searchParams]);

  return (
    <ApiContext.Provider value={{ transactionData: filteredData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

export default ApiProvider;

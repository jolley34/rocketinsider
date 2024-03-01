import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import config from "../config/config";

// Typ-definitioner
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
  companyName?: string;
  logo?: string;
  currentPrice?: number;
}

interface ContextValue {
  transactionData: TransactionData[];
}

const ApiContext = createContext<ContextValue>({ transactionData: [] });

async function fetchData(url: string) {
  const response = await fetch(url);
  return response.json();
}

async function getInsideTransactions(symbol: string) {
  const apiKey = config.apiKey;
  const url = `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`;
  const responseData = await fetchData(url);
  return responseData.data;
}

async function getCompanyProfile(symbol: string) {
  const apiKey = config.apiKey;
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`;
  const responseData = await fetchData(url);
  return { name: responseData.name, logo: responseData.logo };
}

async function getCurrentPrice(symbol: string) {
  const apiKey = config.apiKey;
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  const responseData = await fetchData(url);
  return responseData.c;
}

function mergeTransactions(transactions: TransactionData[]): TransactionData[] {
  const mergedData: { [key: string]: TransactionData } = {};
  transactions.forEach((transaction: TransactionData) => {
    const key = `${transaction.name}-${transaction.transactionCode}`;
    mergedData[key] = mergedData[key] || { ...transaction, totalAmount: 0 };
    mergedData[key].totalAmount += Math.round(
      transaction.change * transaction.transactionPrice
    );
    if (
      !mergedData[key].transactionDate.includes(transaction.transactionDate)
    ) {
      mergedData[key].transactionDate += ` / ${transaction.transactionDate}`;
    }
  });
  return Object.values(mergedData);
}

async function sortAndFilterData(
  transactionData: TransactionData[],
  purchaseType: string | null
) {
  let filteredData: TransactionData[] = [...transactionData];

  if (purchaseType === "sell") {
    filteredData = filteredData.filter(
      (transaction) => transaction.transactionCode === "S"
    );
    filteredData.sort((a, b) => a.totalAmount - b.totalAmount);
  } else if (purchaseType === "purchase") {
    filteredData = filteredData.filter(
      (transaction) => transaction.transactionCode === "P"
    );
    filteredData.sort((a, b) => b.totalAmount - a.totalAmount);
  }

  return filteredData.slice(0, 3);
}

async function getDataFromFilterData(filteredData: TransactionData[]) {
  const transactionsWithCompanyData = await Promise.all(
    filteredData.map(async (transaction) => {
      const companyProfile = await getCompanyProfile(transaction.symbol);
      const currentPrice = await getCurrentPrice(transaction.symbol);
      return {
        ...transaction,
        companyName: companyProfile.name,
        logo: companyProfile.logo,
        currentPrice,
      };
    })
  );
  return transactionsWithCompanyData;
}

function ApiProvider(props: PropsWithChildren<{}>) {
  const [searchParams] = useSearchParams();
  const [summaryData, setSummaryData] = useState<TransactionData[]>([]);

  useEffect(() => {
    async function fetchDataAndSetTransactionData() {
      try {
        const data = await getInsideTransactions("");
        const mergedData = mergeTransactions(data);
        const purchaseType = searchParams.get("type");
        const filteredTransactions = await sortAndFilterData(
          mergedData,
          purchaseType
        );
        const processedData = await getDataFromFilterData(filteredTransactions);
        setSummaryData(processedData); // Uppdaterar summaryData direkt
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchDataAndSetTransactionData();
  }, [searchParams]);

  return (
    <ApiContext.Provider value={{ transactionData: summaryData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

export default ApiProvider;

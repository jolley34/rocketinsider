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

function sortAndFilterData(
  transactionData: TransactionData[],
  purchaseType: string | null
): TransactionData[] {
  const sortedData = [...transactionData];
  if (purchaseType === "sell") {
    return sortedData.sort((a, b) => a.totalAmount - b.totalAmount).slice(0, 3);
  } else if (purchaseType === "purchase") {
    return sortedData.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 3);
  }
  return sortedData;
}

function ApiProvider(props: PropsWithChildren<{}>) {
  const [searchParams] = useSearchParams();
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);

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

  useEffect(() => {
    const purchaseType = searchParams.get("type");
    const sortedData = sortAndFilterData(transactionData, purchaseType);
    setFilteredData(sortedData);
    console.log(purchaseType);
  }, [transactionData, searchParams]);

  return (
    <ApiContext.Provider value={{ transactionData: filteredData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
export default ApiProvider;

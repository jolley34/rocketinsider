import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import config from "../config/config";

type TransactionData = {
  name: string;
  share: number;
  change: number;
  transactionDate: string;
  transactionCode: string;
  transactionPrice: number;
  currency: string;
  symbol: string;
  totalAmount: number;
};

type ContextValue = {
  insiderData: TransactionData[] | null;
};

const ApiContext = createContext<ContextValue>(null as any);

function ApiProvider(props: PropsWithChildren) {
  const [insiderData, setInsiderData] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = config.apiKey;
        const symbol = "";
        const response = await axios.get(
          `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`
        );

        console.log(response);

        const mappedTransactions = response.data
          .filter(
            (transaction: TransactionData) =>
              transaction.currency === "SEK" &&
              (transaction.transactionCode === "P" ||
                transaction.transactionCode === "S")
          )
          .map((transaction: TransactionData) => ({
            ...transaction,
            totalAmount: transaction.change * transaction.transactionPrice,
          }))
          .sort((a: TransactionData, b: TransactionData) => {
            return (
              new Date(b.transactionDate).getTime() -
              new Date(a.transactionDate).getTime()
            );
          });

        setInsiderData(mappedTransactions);
        console.log(mappedTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <ApiContext.Provider value={{ insiderData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApi = () => {
  const context = useContext(ApiContext);
  return context;
};

export default ApiProvider;

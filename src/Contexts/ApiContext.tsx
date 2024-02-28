import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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

function ApiProvider(props: PropsWithChildren<{}>) {
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbol = "";
        const apiKey = config.apiKey;
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`
        );
        const responseData = await response.json();
        if (Array.isArray(responseData.data)) {
          setTransactionData(responseData.data);
        }
      } catch (error) {
        console.error("Can't find data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={{ transactionData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
export default ApiProvider;

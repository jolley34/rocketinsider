import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import config from "../config/config";

// Gränssnitt för transaktionsdata
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

// Gränssnitt för värde i kontexten
interface ContextValue {
  transactionData: TransactionData[];
}

// Skapar en kontext för API-anrop
const ApiContext = createContext<ContextValue>({ transactionData: [] });

// Komponent för att tillhandahålla API-data via kontexten
function ApiProvider(props: PropsWithChildren<{}>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);

  // Hämta data från API:et vid montering av komponenten
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
          const currentTime = new Date().getTime();
          const twentyFourHoursFromNow = currentTime + 24 * 60 * 60 * 1000;

          // Skapa ett objekt för att lagra summerad transaktionsdata
          const summaryData: { [key: string]: TransactionData } = {};

          responseData.data
            .filter((t) => t.transactionCode === "S")
            .forEach((transaction: TransactionData) => {
              if (
                (transaction.transactionCode === "P" ||
                  transaction.transactionCode === "S") &&
                new Date(transaction.transactionDate).getTime() <=
                  twentyFourHoursFromNow
              ) {
                // Generera en unik nyckel med hjälp av namn och transaktionsdatum
                const key = `${transaction.name}-${transaction.transactionDate}`;

                // Om nyckeln redan finns, lägg till transaktionsbeloppen
                if (summaryData[key]) {
                  summaryData[key].totalAmount += Math.round(
                    transaction.change * transaction.transactionPrice
                  );
                  summaryData[key].change += transaction.change;
                } else {
                  // Annars, initiera summerad data
                  summaryData[key] = {
                    ...transaction,
                    totalAmount: Math.round(
                      transaction.change * transaction.transactionPrice
                    ),
                  };
                }
              }
            });

          // Konvertera objektvärden tillbaka till en array
          const displayData = Object.values(summaryData);

          // Sortera arrayen efter totalAmount i fallande ordning
          displayData.sort((a, b) => a.totalAmount - b.totalAmount);

          // Ta de första N-elementen (här är det 5)
          const topTransactions = displayData.slice(0, 5);
          setTransactionData(topTransactions);
        }
      } catch (error) {
        console.error("Kan inte hitta data", error);
      }
    };

    fetchData();
  }, []);

  const purchaseType = searchParams.get("type");
  console.log(purchaseType);
  // gruppera och filtrera på purcahsetyp...

  // Returnera komponenten med kontextvärde
  return (
    <ApiContext.Provider value={{ transactionData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

// Användarhook för att konsumera API-kontexten
export const useApi = () => useContext(ApiContext);
export default ApiProvider;

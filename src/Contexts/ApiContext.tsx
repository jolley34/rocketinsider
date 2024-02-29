import React, {
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
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);

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

          // Funktion för att summera och slå samman transaktioner med samma namn
          const mergeTransactions = (transaction: TransactionData) => {
            const key = `${transaction.name}-${transaction.transactionCode}`;

            if (summaryData[key]) {
              summaryData[key].totalAmount += Math.round(
                transaction.change * transaction.transactionPrice
              );
              summaryData[key].change += transaction.change;

              // Kolla om datumet redan finns i sammanfogningsobjektet
              if (
                !summaryData[key].transactionDate.includes(
                  transaction.transactionDate
                )
              ) {
                // Lägg till det unika datumet
                summaryData[
                  key
                ].transactionDate += ` / ${transaction.transactionDate}`;
              }
            } else {
              summaryData[key] = {
                ...transaction,
                totalAmount: Math.round(
                  transaction.change * transaction.transactionPrice
                ),
              };
            }
          };

          // Loopa igenom transaktionsdata och sammanfoga transaktioner med samma namn
          responseData.data.forEach((transaction: TransactionData) => {
            if (
              (transaction.transactionCode === "P" ||
                transaction.transactionCode === "S") &&
              new Date(transaction.transactionDate).getTime() <=
                twentyFourHoursFromNow
            ) {
              mergeTransactions(transaction);
            }
          });

          let displayData = Object.values(summaryData);

          setTransactionData(displayData);
        }
      } catch (error) {
        console.error("Kan inte hitta data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const purchaseType = searchParams.get("type");

    // Skapa en kopia av transaktionsdatan för att sortera utan att påverka ursprunglig data
    const dataToSort = [...transactionData];

    // Sortera data beroende på köp- eller säljtyp
    if (purchaseType === "sell") {
      dataToSort.sort((a, b) => a.totalAmount - b.totalAmount); // Säljordning, högsta totala belopp först
    } else if (purchaseType === "purchase") {
      dataToSort.sort((a, b) => b.totalAmount - a.totalAmount); // Köpordning, lägsta totala belopp först
    }

    // Uppdatera filtrerad data med sorterad data och begränsa till 3 största transaktioner
    const filteredTopTransactions = dataToSort.slice(0, 3);
    setFilteredData(filteredTopTransactions);
    console.log(filteredTopTransactions); // filteredTopTransaction visar enbart de tre största köp och sälj, denna ska jag utveckla vidare för att visa CurrentPrice Osv
  }, [transactionData, searchParams]);

  return (
    <ApiContext.Provider value={{ transactionData: filteredData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
export default ApiProvider;

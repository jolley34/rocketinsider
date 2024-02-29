import React, {
  createContext, // Skapar en kontext för att dela data med flera komponenter
  PropsWithChildren,
  useContext, // Används för att konsumera värden från en kontext
  useEffect, // Används för att köra kod när komponenten renderas
  useState, // Används för att hantera tillstånd i en funktionell komponent
} from "react";
import { useSearchParams } from "react-router-dom"; // Används för att hantera URL-parametrar
import config from "../config/config"; // Importerar konfigurationsfilen

// Definierar datatyper för transaktioner
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

// Definierar typen för kontextvärdet
interface ContextValue {
  transactionData: TransactionData[];
}

// Skapar en kontext för API-data
const ApiContext = createContext<ContextValue>({ transactionData: [] });

// Funktion för att hämta data från API:et
async function fetchData(symbol: string): Promise<TransactionData[]> {
  const apiKey = config.apiKey; // Hämtar API-nyckeln från konfigurationen
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`
  ); // Hämtar data från API:et
  const responseData = await response.json(); // Konverterar svaret till JSON-format
  return responseData.data.filter((transaction: TransactionData) =>
    ["P", "S"].includes(transaction.transactionCode)
  ); // Filtrerar och returnerar transaktionsdata
}

// Funktion för att sammanfoga transaktioner
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

// Funktion för att sortera och filtrera data
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

// Komponent för att tillhandahålla API-data med hjälp av kontext
function ApiProvider(props: PropsWithChildren<{}>) {
  const [searchParams] = useSearchParams(); // Hämtar URL-parametrar med hjälp av React Router
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]); // Tillståndsvariabel för transaktionsdata
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]); // Tillståndsvariabel för filtrerad data

  // Effektfunktion för att hämta och sätta transaktionsdata
  useEffect(() => {
    async function fetchDataAndSetTransactionData() {
      try {
        const data = await fetchData(""); // Hämtar transaktionsdata från API:et
        const mergedData = mergeTransactions(data); // Sammanfogar transaktionsdata
        setTransactionData(mergedData); // Sätter transaktionsdata i tillståndsvariabeln
      } catch (error) {
        console.error("Kan inte hitta data", error); // Hanterar fel om data inte kan hämtas
      }
    }
    fetchDataAndSetTransactionData(); // Anropar funktionen för att hämta data när komponenten renderas
  }, []);

  // Effektfunktion för att sortera och filtrera data baserat på URL-parametrar
  useEffect(() => {
    const purchaseType = searchParams.get("type"); // Hämtar typen av transaktion från URL-parametrar
    const sortedData = sortAndFilterData(transactionData, purchaseType); // Sorterar och filtrerar transaktionsdata
    setFilteredData(sortedData); // Sätter filtrerad data i tillståndsvariabeln
    console.log(purchaseType); // Loggar typen av transaktion i konsolen
  }, [transactionData, searchParams]); // Uppdaterar effektfunktionen när transaktionsdata eller URL-parametrar ändras

  // Returnerar Provider-komponenten för API-kontexten med filtrerad data
  return (
    <ApiContext.Provider value={{ transactionData: filteredData }}>
      {props.children}
    </ApiContext.Provider>
  );
}

// Anpassad hook för att använda API-kontexten i komponenter
export const useApi = () => useContext(ApiContext);

export default ApiProvider; // Exporterar ApiProvider-komponenten som standard

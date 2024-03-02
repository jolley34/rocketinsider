import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../src/Pages/HomePage/HomePage";
import App from "../App";
import ApiProvider from "../Contexts/ApiContext";
import TransactionPage from "../Pages/InsiderTransactionsPage/TransactionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApiProvider>
        <App />
      </ApiProvider>
    ),
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/transactions",
        element: <TransactionPage />,
      },
    ],
  },
]);

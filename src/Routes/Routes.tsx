import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import TransactionPage from "../Pages/InsiderTransactionsPage/TransactionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/transactions",
        element: <TransactionPage />,
      },
    ],
  },
]);

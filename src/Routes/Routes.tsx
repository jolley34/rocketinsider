import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ApiProvider from "../contexts/ApiContext";
import Home from "../pages/HomePage/Home";
import TransactionPage from "../pages/InsiderTransactionsPage/TransactionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApiProvider>
        <App />
      </ApiProvider>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "/transactions",
        element: <TransactionPage />,
      },
    ],
  },
]);

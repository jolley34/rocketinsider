import { createBrowserRouter } from "react-router-dom";

import Home from "../../src/Pages/HomePage/HomePage";
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
      { path: "", element: <Home /> },
      {
        path: "/transactions",
        element: <TransactionPage />,
      },
    ],
  },
]);

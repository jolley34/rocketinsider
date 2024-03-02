import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ApiProvider from "../Contexts/ApiContext";
import HomePage from "../Pages/HomePage/HomePage";
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

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ApiProvider from "../Contexts/ApiContext";
import Home from "../Pages/HomePage/Home";
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

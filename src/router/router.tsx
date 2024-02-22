import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "../pages/Home/Homepage";
import LargestPurchase from "../pages/InsiderTransactionsPage/LargestPurchase";
import LargestSell from "../pages/InsiderTransactionsPage/LargestSell";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="largest/purchase" element={<LargestPurchase />} />
        <Route path="largest/sell" element={<LargestSell />} />
        <Route path="*" element={<span>Sidan finns inte...</span>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

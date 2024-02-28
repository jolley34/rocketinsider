import { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../config/config";
import TransactionHeader from "./TransactionHeader";

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

const GridContainer = styled.section`
  display: grid;
  gap: 2rem;
  padding: 0 5rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2rem;
`;

const GridCard = styled.div`
  background-color: #202020;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SubTitle = styled.p`
  color: #6693a5;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Info = styled.p`
  color: #c2dee9;
  font-size: 1rem;
`;

const Symbol = styled.h1`
  color: #c2dee9;
  font-size: 3rem;
`;

const AmountBuyInfo = styled(Info)`
  font-size: 1.5rem;
  color: #8bce92;
`;

const AmountSellInfo = styled(Info)`
  font-size: 1.5rem;
  color: #b94c46;
`;

function TransactionPage() {
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
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
          setTransactionData(responseData.data);
        }
      } catch (error) {
        console.error("Cant find data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TransactionHeader />
      <GridContainer>
        {transactionData.map((transaction, index) => (
          <GridCard key={index}>
            <SubTitle>Symbol</SubTitle>
            <Symbol>{transaction.symbol}</Symbol>
            <SubTitle>Name</SubTitle>
            <Info>{transaction.name}</Info>
            <SubTitle>Transaction Date</SubTitle>
            <Info>{transaction.transactionDate}</Info>
            <SubTitle>Transaction Code</SubTitle>
            <Info>{transaction.transactionCode}</Info>
            <SubTitle>Transaction Average Price</SubTitle>
            <Info>{transaction.transactionPrice}</Info>
          </GridCard>
        ))}
      </GridContainer>
    </>
  );
}

export default TransactionPage;

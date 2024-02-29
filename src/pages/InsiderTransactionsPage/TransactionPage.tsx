import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useApi } from "../../Contexts/ApiContext";
import TransactionHeader from "./TransactionHeader";

const GridContainer = styled.section`
  display: grid;
  gap: 2rem;
  padding: 0 5rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2rem;
  overflow-x: scroll;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GridCard = styled.div`
  background-color: #202020;
  border-radius: 10px;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 480px;
  animation: ${CardAnimation} 0.3s ease-out forwards;
`;

const SubTitle = styled.p`
  color: #6693a5;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Number = styled(SubTitle)`
  color: #a7b9c0;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Info = styled.p`
  color: #c2dee9;
  font-size: 1rem;
  font-weight: 500;
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

const IsParamSellOrBuy = styled.h1`
  color: #c2dee9;
  font-size: 1.25rem;
`;

const LoadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 8px solid #c2dee9;
  border-top: 8px solid #7fc7e3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${LoadingAnimation} 2s linear infinite;
  margin: auto;
  margin-top: 2rem;
`;

function TransactionPage() {
  const { transactionData } = useApi();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (transactionData.length > 0) {
      setLoading(false);
    }
  }, [transactionData]);

  return (
    <>
      <TransactionHeader />
      {loading || !transactionData ? (
        <Loader />
      ) : (
        <GridContainer>
          {transactionData.slice(0, 3).map((transaction, index) => (
            <GridCard key={index}>
              <Flex>
                <Symbol>{transaction.symbol}</Symbol>
                <Number>#{index + 1}</Number>
              </Flex>
              <Flex>
                <div></div>
                {transaction.transactionCode === "S" ? (
                  <IsParamSellOrBuy>SELL</IsParamSellOrBuy>
                ) : (
                  <IsParamSellOrBuy>BUY</IsParamSellOrBuy>
                )}
              </Flex>
              <SubTitle>Insider Name</SubTitle>
              <Info>{transaction.name}</Info>
              <SubTitle>Transaction Date</SubTitle>
              <Info>{transaction.transactionDate}</Info>
              {transaction.transactionCode === "S" ? (
                <SubTitle>Shares Sold</SubTitle>
              ) : (
                <SubTitle>Shares Bought</SubTitle>
              )}
              <Info>{transaction.change}</Info>
              <SubTitle>Transaction Average Price</SubTitle>
              <Info>{transaction.transactionPrice}</Info>
              <SubTitle>Total Amount</SubTitle>
              {transaction.transactionCode === "S" ? (
                <AmountSellInfo>
                  {Math.abs(transaction.totalAmount).toLocaleString("sv-SE")} $
                </AmountSellInfo>
              ) : (
                <AmountBuyInfo>
                  {transaction.totalAmount.toLocaleString("sv-SE")} $
                </AmountBuyInfo>
              )}
            </GridCard>
          ))}
        </GridContainer>
      )}
    </>
  );
}

export default TransactionPage;

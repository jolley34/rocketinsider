import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useApi } from "../../Contexts/ApiContext";
import TransactionHeader from "./TransactionHeader";

type GridCardProps = {
  animated: boolean;
};

const GridContainer = styled.section`
  display: grid;
  gap: 3rem;
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

const GridCard = styled.div<GridCardProps>`
  background-color: #00000079;
  mix-blend-mode: lighten;
  border-radius: 10px 10px 10px 10px;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 630px;
  backdrop-filter: blur(33px);
  box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
  background-blend-mode: overlay;
  box-sizing: border-box;
  animation: ${({ animated }) =>
    animated &&
    css`
      ${CardAnimation} 0.3s ease-out forwards;
    `};
`;

const SubTitle = styled.p`
  color: #7fc7e3;
  font-weight: 700;
  font-size: 1rem;
`;

const Number = styled(SubTitle)`
  color: #a7b9c0;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Info = styled.p`
  color: #c2dee9;
  font-size: 1.25rem;
  font-weight: 900;
`;

const CompanyName = styled(Info)`
  color: #c2dee9;
  font-size: 1.5rem;
  font-weight: 900;
`;

const Symbol = styled.h1`
  color: #c2dee9;
  font-size: 3rem;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const AmountBuyInfo = styled(Info)`
  font-size: 2rem;
  color: #8bce92;
  font-weight: 600;
`;

const AmountSellInfo = styled(Info)`
  font-size: 2rem;
  color: #f7635b;
  font-weight: 600;
`;

const IsParamSellOrBuy = styled.h1`
  color: #c2dee9;
  font-size: 2rem;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 50px;
  height: 50px;
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
  const { transactionData, loading } = useApi();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (transactionData.length > 0) {
      setAnimated(true);
      const timer = setTimeout(() => {
        setAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [transactionData]);

  return (
    <>
      <TransactionHeader />
      {loading ? (
        <Loader />
      ) : (
        <GridContainer>
          {transactionData.map((transaction, index) => (
            <GridCard key={index} animated={animated}>
              <Flex>
                <Symbol>{transaction.symbol || "Unknown"}</Symbol>
                <Image
                  src={
                    transaction.logo ||
                    "https://www.svgrepo.com/show/340721/no-image.svg"
                  }
                />
              </Flex>
              <Flex>
                <CompanyName>
                  {transaction.companyName || "Unknown Company Name"}
                </CompanyName>
                <FlexCol>
                  <Info>{transaction.currentPrice || "Unknown"}</Info>
                  <SubTitle>Current</SubTitle>
                  <SubTitle>Price</SubTitle>
                </FlexCol>
              </Flex>
              <Flex>
                <SubTitle>Insider Name</SubTitle>
              </Flex>
              <Info>{transaction.name}</Info>
              <SubTitle>Transaction Date</SubTitle>
              <Info>{transaction.transactionDate}</Info>
              <SubTitle>
                {transaction.transactionCode === "S"
                  ? "Shares Sold"
                  : "Shares Bought"}
              </SubTitle>
              <Info>
                {Math.abs(transaction.change).toLocaleString("sv-SE")}{" "}
              </Info>
              <SubTitle>Transaction Average Price</SubTitle>
              <Info>{transaction.transactionPrice}</Info>
              <SubTitle>Total Amount</SubTitle>
              <Flex>
                {transaction.transactionCode === "S" ? (
                  <AmountSellInfo>
                    {Math.abs(transaction.totalAmount).toLocaleString("sv-SE")}{" "}
                    $
                  </AmountSellInfo>
                ) : (
                  <AmountBuyInfo>
                    {transaction.totalAmount.toLocaleString("sv-SE")} $
                  </AmountBuyInfo>
                )}
                <IsParamSellOrBuy>
                  {transaction.transactionCode === "S" ? "SELL" : "BUY"}
                </IsParamSellOrBuy>
              </Flex>
            </GridCard>
          ))}
        </GridContainer>
      )}
    </>
  );
}

export default TransactionPage;

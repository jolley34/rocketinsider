import styled from "styled-components";
import { useApi } from "../../Contexts/TransactionContext";

const GridContainer = styled.section`
  display: grid;
  gap: 2rem;
  padding-inline: 5rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2rem;
`;

const Symbol = styled.h1`
  color: #c2dee9;
  font-size: 3rem;
`;

const SubTitle = styled.p`
  color: #6693a5;
  font-weight: 600;
  font-size: 0.9rem;
`;

const GridCard = styled.div`
  background-color: #202020;
  padding: 4rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.h1`
  color: #c2dee9;
  font-size: 1rem;
`;

const AmountBuyInfo = styled(Info)`
  font-size: 1.5rem;
  color: #8bce92;
`;

const AmountSellInfo = styled(Info)`
  font-size: 1.5rem;
  color: #b94c46;
`;

const TransactionPage = () => {
  const { insiderData } = useApi();

  return (
    <GridContainer>
      {insiderData &&
        insiderData.map((transaction, index) => (
          <GridCard key={index}>
            <SubTitle>Symbol</SubTitle>
            <Symbol>{transaction.symbol}</Symbol>
            <SubTitle>Name</SubTitle>
            <Info>{transaction.name}</Info>
            <SubTitle>Transaction Date</SubTitle>
            <Info>{transaction.transactionDate}</Info>
            <SubTitle>Shares Bought</SubTitle>
            <Info>{transaction.change}</Info>
            <SubTitle>Average Price Per Share</SubTitle>
            <Info>{transaction.transactionPrice}</Info>
            <SubTitle>Amount</SubTitle>
            {transaction.transactionCode === "P" ? (
              <AmountBuyInfo>{transaction.totalAmount}</AmountBuyInfo>
            ) : (
              <AmountSellInfo>{transaction.totalAmount}</AmountSellInfo>
            )}
          </GridCard>
        ))}
    </GridContainer>
  );
};

export default TransactionPage;

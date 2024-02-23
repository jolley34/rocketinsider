import styled from "styled-components";
import TransactionHeader from "./TransactionHeader";

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
`;

const GridCard = styled.div`
  background-color: #202020;
  height: 500px;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.h1`
  color: #c2dee9;
`;

function TransactionPage() {
  return (
    <>
      <TransactionHeader />
      <GridContainer>
        <GridCard>
          <SubTitle>Symbol</SubTitle>
          <Symbol>TSLA</Symbol>
          <SubTitle>Name</SubTitle>
          <Info>Elon Musk</Info>
          <SubTitle>Transaction Date</SubTitle>
          <Info>22/11-2023</Info>
          <SubTitle>Shares Bought</SubTitle>
          <Info>50 000</Info>
          <SubTitle>Average Price Per Share</SubTitle>
          <Info>194.3</Info>
        </GridCard>
        <GridCard>
          <SubTitle>Symbol</SubTitle>
          <Symbol>TSLA</Symbol>
          <SubTitle>Name</SubTitle>
          <Info>Elon Musk</Info>
          <SubTitle>Transaction Date</SubTitle>
          <Info>22/11-2023</Info>
          <SubTitle>Shares Bought</SubTitle>
          <Info>50 000</Info>
          <SubTitle>Average Price Per Share</SubTitle>
          <Info>194.3</Info>
        </GridCard>
        <GridCard>
          <SubTitle>Symbol</SubTitle>
          <Symbol>TSLA</Symbol>
          <SubTitle>Name</SubTitle>
          <Info>Elon Musk</Info>
          <SubTitle>Transaction Date</SubTitle>
          <Info>22/11-2023</Info>
          <SubTitle>Shares Bought</SubTitle>
          <Info>50 000</Info>
          <SubTitle>Average Price Per Share</SubTitle>
          <Info>194.3</Info>
        </GridCard>
      </GridContainer>
    </>
  );
}

export default TransactionPage;

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

/* Köp Färg Grön */
const AmountBuyInfo = styled(Info)`
  font-size: 1.5rem;
  color: #8bce92;
`;

/* Sälj Färg Röd */
const AmountSellInfo = styled(Info)`
  font-size: 1.5rem;
  color: #b94c46;
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
          <Info>194.32</Info>
          <SubTitle>Amount</SubTitle>
          <AmountBuyInfo>500 000 000 $</AmountBuyInfo>
        </GridCard>
        <GridCard>
          <SubTitle>Symbol</SubTitle>
          <Symbol>LUNR</Symbol>
          <SubTitle>Name</SubTitle>
          <Info>TO THE MOON</Info>
          <SubTitle>Transaction Date</SubTitle>
          <Info>23/02-2024</Info>
          <SubTitle>Shares Bought</SubTitle>
          <Info>400 000</Info>
          <SubTitle>Average Price Per Share</SubTitle>
          <Info>10000.54</Info>
          <SubTitle>Amount</SubTitle>
          <AmountBuyInfo>400 000 000 000 $</AmountBuyInfo>
        </GridCard>
        <GridCard>
          <SubTitle>Symbol</SubTitle>
          <Symbol>PLEJD</Symbol>
          <SubTitle>Name</SubTitle>
          <Info>Unkown</Info>
          <SubTitle>Transaction Date</SubTitle>
          <Info>22/11-2023</Info>
          <SubTitle>Shares Bought</SubTitle>
          <Info>300 000</Info>
          <SubTitle>Average Price Per Share</SubTitle>
          <Info>103.35</Info>
          <SubTitle>Amount</SubTitle>
          <AmountBuyInfo>30 000 000 $</AmountBuyInfo>
        </GridCard>
      </GridContainer>
    </>
  );
}

export default TransactionPage;

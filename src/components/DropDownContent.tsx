import React from "react";
import styled from "styled-components";

const ContentContainer = styled.section`
  padding: 10rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Text = styled.p`
  width: 80%;
  font-size: 1.5rem;
  color: #c2dee9;
  margin-bottom: 1rem;
`;

const TextColorChange = styled(Text)`
  color: #7fc7e3;
`;

const ContentTitle = styled.h1`
  color: #c2dee9;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const BigMoney = styled.span`
  color: #8bce92;
  font-weight: 900;
`;

const Sell = styled.span`
  color: #f7635b;
  font-weight: 900;
`;

const FontWeight = styled.span`
  color: #c2dee9;
  font-weight: 900;
`;

function DropDownContent() {
  return (
    <ContentContainer>
      <div>
        <ContentTitle>Our Vision</ContentTitle>
        <Text>
          Rather than displaying excessive data, this will provide only the top
          3 largest INSIDE TRANSACTIONS from the US market the last 24 Hours.
        </Text>
        <Text>
          Rather than the typical mundane transaction site inundated with
          excessive data, endless scrolling through a white background, and an
          overwhelming amount of text, this platform aims to modernize trading
          platforms.{" "}
        </Text>
        <Text>
          This is for someone that likes to follow the{" "}
          <BigMoney>BIG MONEY</BigMoney>.
        </Text>
        <Text>
          Even though this is by <FontWeight>NO</FontWeight> means a financial
          recommendation to <BigMoney>BUY</BigMoney>/<Sell>SELL</Sell>/ or{" "}
          <FontWeight>TRADE</FontWeight> the symbol displayed.
        </Text>
      </div>
      <div>
        <TextColorChange>rocketinsider.</TextColorChange>
      </div>
    </ContentContainer>
  );
}

export default DropDownContent;

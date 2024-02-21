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

function DropDownContent() {
  return (
    <ContentContainer>
      <div>
        <ContentTitle>The Vision</ContentTitle>
        <Text>
          Rather than displaying excessive data, this will provide only the top
          3 largest INSIDE TRANSACTIONS from the US market today.
        </Text>
        <Text>
          This is by no means a financial recommendation to buy, sell, or trade
          the symbol displayed.
        </Text>
      </div>
      <div>
        <TextColorChange>rocketinsider.</TextColorChange>
      </div>
    </ContentContainer>
  );
}

export default DropDownContent;

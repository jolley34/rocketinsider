import styled from "styled-components";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #b8d3dd;
  font-weight: 700;
`;

const Wrapper = styled.section`
  padding: 4rem;
  background: #1d1d1d;
`;

function App() {
  return (
    <Wrapper>
      <FlexBetween>
        <Title>NYA resturanger GBG</Title>
      </FlexBetween>
    </Wrapper>
  );
}

export default App;

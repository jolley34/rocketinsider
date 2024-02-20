import styled from "styled-components";
import Menu from "./Menu";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #7fc7e3;
  font-weight: 700;
`;

const Wrapper = styled.section`
  padding: 4rem;
  background: #1d1d1d;
`;

function Header() {
  return (
    <Wrapper>
      <FlexBetween>
        <Title>NYA resturanger GBG</Title>
        <Menu />
      </FlexBetween>
    </Wrapper>
  );
}

export default Header;

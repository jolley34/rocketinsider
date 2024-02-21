import styled from "styled-components";
import Menu from "./Menu";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #c2dee9;
  font-weight: 700;
  font-size: 2rem;
`;

const SubTitle = styled.h1`
  color: #7fc7e3;
  font-weight: 700;
  font-size: 2rem;
`;

const Wrapper = styled.section`
  padding: 10rem;
  background: #1d1d1d;
`;

function Header() {
  return (
    <Wrapper>
      <FlexBetween>
        <Title>explore</Title>
        <Menu />
      </FlexBetween>
      <SubTitle>rocketinsider.</SubTitle>
    </Wrapper>
  );
}

export default Header;

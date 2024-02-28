import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../../components/Menu";
import NavbarTransaction from "../../components/NavbarTransaction";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubTitle = styled.h1`
  color: #7fc7e3;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Wrapper = styled.section`
  padding: 2rem 5rem 0rem 5rem;
  background: rgb(25, 25, 25);
`;

const Border = styled.div`
  border-bottom: solid 2px #c3d1d7;
  width: 100%;
  margin-top: 0.5rem;
`;

function TransactionHeader() {
  return (
    <Wrapper>
      <FlexBetween>
        <Link to="/">
          <SubTitle>rocketinsider.</SubTitle>
        </Link>
        <Menu />
      </FlexBetween>

      <NavbarTransaction />
      <Border />
    </Wrapper>
  );
}

export default TransactionHeader;

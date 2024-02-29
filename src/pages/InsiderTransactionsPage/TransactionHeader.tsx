import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../../components/Menu";
import NavbarTransaction from "../../components/NavbarTransaction";

type subTitleProps = {
  isVisible: boolean;
};

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubTitle = styled.h1<subTitleProps>`
  color: #c2dee9;
  font-weight: 700;
  font-size: 1.5rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Wrapper>
      <FlexBetween>
        <Link to="/">
          <SubTitle isVisible={isVisible}>rocketinsider.</SubTitle>
        </Link>
        <Menu />
      </FlexBetween>

      <NavbarTransaction />
    </Wrapper>
  );
}

export default TransactionHeader;

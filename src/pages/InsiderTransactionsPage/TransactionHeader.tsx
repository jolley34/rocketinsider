import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../../components/Menu";
import NavbarTransaction from "../../components/NavbarTransaction";

type animationProp = {
  isVisible: boolean;
};

const Flex = styled.div`
  display: flex;
  align-items: last baseline;
  gap: 2rem;
`;

const ItemFlex = styled(Flex)`
  gap: 0.25rem;
`;

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubTitle = styled.h1<animationProp>`
  color: #c2dee9;
  font-weight: 700;
  font-size: 1.5rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
`;

const BetaTitle = styled.h1<animationProp>`
  color: #9edaf3;
  font-weight: 700;
  font-size: 1rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
`;

const VersionTitle = styled(BetaTitle)<animationProp>`
  color: #b3ddef;
  font-weight: 700;
  font-size: 0.75rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
`;

const Wrapper = styled.section`
  padding: 2rem 5rem 0rem 5rem;
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
        <Flex>
          <Link to="/">
            <SubTitle isVisible={isVisible}>rocketinsider.</SubTitle>
          </Link>
          <ItemFlex>
            <BetaTitle isVisible={isVisible}>BETA</BetaTitle>
            <VersionTitle isVisible={isVisible}>Version 0.1</VersionTitle>
          </ItemFlex>
        </Flex>
        <Menu />
      </FlexBetween>

      <NavbarTransaction />
    </Wrapper>
  );
}

export default TransactionHeader;

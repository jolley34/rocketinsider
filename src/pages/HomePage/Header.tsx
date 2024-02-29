import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../../components/Menu";

type TitleProps = {
  isVisible: boolean;
};

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1<TitleProps>`
  color: #c2dee9;
  font-weight: 700;
  font-size: 2rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.4s ease-out;
`;

const SubTitle = styled.h1<TitleProps>`
  color: #7fc7e3;
  font-weight: 700;
  font-size: 2rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
`;

const Wrapper = styled.section`
  padding: 10rem;
  background: #1d1d1d;
`;

function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Wrapper>
      <FlexBetween>
        <Link to="/">
          <Title isVisible={isVisible}>explore</Title>
        </Link>
        <Menu />
      </FlexBetween>
      <Link to="/">
        <SubTitle isVisible={isVisible}>rocketinsider.</SubTitle>
      </Link>
    </Wrapper>
  );
}

export default Header;

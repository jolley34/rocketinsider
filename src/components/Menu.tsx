import { useState } from "react";
import styled from "styled-components";
import DropDownContent from "../components/DropDownContent";

interface MenuOpen {
  isOpen: boolean;
}

const MenuBar = styled.button<MenuOpen>`
  svg {
    fill: #c2dee9;
  }
  background: none;
  border: none;
  cursor: pointer;
  display: ${({ isOpen }) => (isOpen ? "none" : "block")};
`;

const CloseButton = styled.button<MenuOpen>`
  background: none;
  border: none;
  color: #c2dee9;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropDown = styled.div<MenuOpen>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #1d1d1d;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? "100vh" : "0")};
  transition: height 0.3s ease-in-out;
`;

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <CloseButton isOpen={isOpen} onClick={toggleDropDown}>
        ×
      </CloseButton>
      <DropDown isOpen={isOpen}>
        <DropDownContent />
      </DropDown>
      <MenuBar isOpen={isOpen} onClick={toggleDropDown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
        </svg>
      </MenuBar>
    </>
  );
}

export default Menu;

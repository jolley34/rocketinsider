import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavbar } from "../contexts/NavbarContext";

type listItemProp = {
  isSelected: boolean;
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarContainer = styled.ul`
  margin-top: 1rem;
  padding-bottom: 1rem;
`;

const ListItem = styled.li<listItemProp>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? "#7fc7e3" : "#c2dee9")};
  position: relative;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #7fc7e3;
  }
`;

const ListItemBorder = styled.div<listItemProp>`
  bottom: 0;
  left: 0;
  width: ${({ isSelected }) => (isSelected ? "100%" : "0")};
  height: 2px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#7fc7e3" : "transparent"};
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  &:hover {
    background-color: #7fc7e3;
    width: 100%;
  }
`;

const ListItemSub = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: #c2dee9;
  transition: color 0.3s ease-in-out;
`;

const StyledLink = styled(Link)<listItemProp>``;

const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
`;

function NavbarTransaction() {
  const { selectedNavItem, setSelectedNavItem } = useNavbar();

  const handleSelect = (navItem: string) => {
    setSelectedNavItem(navItem);
  };

  return (
    <NavbarContainer>
      <Flex>
        <ListItemContainer>
          <StyledLink
            to="/transactions?type=purchase"
            isSelected={selectedNavItem === "/transactions?type=purchase"}
            onClick={() => handleSelect("/transactions?type=purchase")}
          >
            <ListItem
              isSelected={selectedNavItem === "/transactions?type=purchase"}
            >
              Largest purchase
            </ListItem>
            <ListItemBorder
              isSelected={selectedNavItem === "/transactions?type=purchase"}
            />
          </StyledLink>

          <StyledLink
            to="/transactions?type=sell"
            isSelected={selectedNavItem === "/transactions?type=sell"}
            onClick={() => handleSelect("/transactions?type=sell")}
          >
            <ListItem
              isSelected={selectedNavItem === "/transactions?type=sell"}
            >
              Largest sell
            </ListItem>
            <ListItemBorder
              isSelected={selectedNavItem === "/transactions?type=sell"}
            />
          </StyledLink>
        </ListItemContainer>
        <ListItemSub>The last 24 hours</ListItemSub>
      </Flex>
    </NavbarContainer>
  );
}

export default NavbarTransaction;

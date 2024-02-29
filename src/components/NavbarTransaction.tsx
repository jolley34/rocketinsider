import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavbar } from "../Contexts/NavbarContext";

type listItemProp = {
  isSelected: boolean;
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = styled.ul`
  display: flex;
  gap: 2rem;
`;

const ListItem = styled.li<listItemProp>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? "#7fc7e3" : "#c2dee9")};
  margin-top: 1rem;
  position: relative;
  transition: color 0.3s ease-in-out;
`;

const ListItemBorder = styled.div<listItemProp>`
  bottom: 0;
  left: 0;
  width: ${({ isSelected }) => (isSelected ? "100%" : "0")};
  height: 2px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#7fc7e3" : "transparent"};
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;

const ListItemSub = styled.span<listItemProp>`
  border-bottom: none;
  margin-top: 0rem;
  text-align: left;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? "#7fc7e3" : "#c2dee9")};
  font-size: 0.6rem;
  transition: color 0.3s ease-in-out;
`;

const ListItemContainer = styled.div<listItemProp>`
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #7fc7e3;
    ${ListItem} {
      color: #7fc7e3;
    }
    ${ListItemSub} {
      color: #7fc7e3;
    }
    ${ListItemBorder} {
      background-color: #7fc7e3;
      width: 100%;
    }
  }
`;

function NavbarTransaction() {
  const { selectedNavItem, setSelectedNavItem } = useNavbar();

  const handleSelect = (navItem: string) => {
    setSelectedNavItem(navItem);
  };

  return (
    <NavbarContainer>
      <Flex>
        <Link to="/transactions?type=purchase">
          <ListItemContainer
            isSelected={selectedNavItem === "/transactions?type=purchase"}
            onClick={() => handleSelect("/transactions?type=purchase")}
          >
            <ListItem
              isSelected={selectedNavItem === "/transactions?type=purchase"}
            >
              Largest purchase
              <ListItemBorder
                isSelected={selectedNavItem === "/transactions?type=purchase"}
              />
            </ListItem>
            <ListItemSub
              isSelected={selectedNavItem === "/transactions?type=purchase"}
            >
              The last 24 hours
            </ListItemSub>
          </ListItemContainer>
        </Link>
      </Flex>
      <Flex>
        <Link to="/transactions?type=sell">
          <ListItemContainer
            isSelected={selectedNavItem === "/transactions?type=sell"}
            onClick={() => handleSelect("/transactions?type=sell")}
          >
            <ListItem
              isSelected={selectedNavItem === "/transactions?type=sell"}
            >
              Largest sell
              <ListItemBorder
                isSelected={selectedNavItem === "/transactions?type=sell"}
              />
            </ListItem>
            <ListItemSub
              isSelected={selectedNavItem === "/transactions?type=sell"}
            >
              The last 24 hours
            </ListItemSub>
          </ListItemContainer>
        </Link>
      </Flex>
    </NavbarContainer>
  );
}

export default NavbarTransaction;

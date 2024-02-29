import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavbar } from "../Contexts/NavbarContext";

type ListItemProp = {
  isSelected: boolean;
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = styled.ul`
  display: flex;
  gap: 2rem;
  padding: 0rem 10rem;
`;

const ListItem = styled.div<ListItemProp>`
  color: #c2dee9;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  position: relative;
  transition: margin 0.3s ease-in-out;
`;

const ListItemSub = styled(ListItem)<ListItemProp>`
  border-bottom: none;
  margin-top: 0.25rem;
  text-align: left;
  font-weight: 700;
  font-size: 1rem;
  color: #7fc7e3;
  transition: color 0.3s ease-in-out;
`;

const ListItemBorder = styled.div<ListItemProp>`
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #7fc7e3;
  transition: width 0.3s ease-in-out;
`;

const ListItemContainer = styled.div<ListItemProp>`
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:hover {
    ${ListItem} {
      color: #7fc7e3;
    }
    ${ListItemBorder} {
      width: 100%;
    }
  }
`;

function NavbarHome() {
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
              isSelected={selectedNavItem === "/transactions?type=sell"}
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

export default NavbarHome;

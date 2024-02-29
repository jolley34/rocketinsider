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
  padding: 0rem 10rem;
`;

const ListItemContainer = styled.div<listItemProp>`
  cursor: pointer;
  &:hover {
    color: #7fc7e3;
  }
`;

const ListItem = styled.li`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ListItemSub = styled(ListItem)`
  border-bottom: none;
  margin-top: 0rem;
  text-align: left;
  font-weight: 700;
  font-size: 1rem;
`;

function NavbarHome() {
  const { selectedNavItem, setSelectedNavItem } = useNavbar();

  const handleSelect = (navItem: string) => {
    setSelectedNavItem(navItem);
  };

  return (
    <NavbarContainer>
      <Flex>
        <StyledLink to="/transactions?type=purchase">
          <ListItemContainer
            isSelected={selectedNavItem === "/transactions?type=purchase"}
            onClick={() => handleSelect("/transactions?type=purchase")}
          >
            <ListItem>Largest purchase</ListItem>
            <ListItemSub>The last 24 hours</ListItemSub>
          </ListItemContainer>
        </StyledLink>
      </Flex>
      <Flex>
        <StyledLink to="/transactions?type=sell">
          <ListItemContainer
            isSelected={selectedNavItem === "/transactions?type=sell"}
            onClick={() => handleSelect("/transactions?type=sell")}
          >
            <ListItem>Largest sell</ListItem>
            <ListItemSub>The last 24 hours</ListItemSub>
          </ListItemContainer>
        </StyledLink>
      </Flex>
    </NavbarContainer>
  );
}

export default NavbarHome;

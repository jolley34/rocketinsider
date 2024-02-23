import { Link } from "react-router-dom";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = styled.ul`
  display: flex;
  gap: 2rem;
`;

const ListItem = styled.li`
  font-size: 1rem;
  font-weight: 700;
  color: #c2dee9;
  border-bottom: solid 3px #7fc7e3;
  margin-top: 1rem;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  cursor: pointer;
`;

const ListItemSub = styled(ListItem)`
  border-bottom: none;
  margin-top: 0rem;
  text-align: left;
  font-weight: 700;
  color: #7fc7e3;
  font-size: 0.75rem;
`;

function NavbarTransaction() {
  return (
    <NavbarContainer>
      <Flex>
        <Link to="/transactions">
          <ListItem>Largest purchase</ListItem>
          <ListItemSub>The last 24 hours</ListItemSub>
        </Link>
      </Flex>
      <Flex>
        <Link to="/transactions">
          <ListItem>Largest sell</ListItem>
          <ListItemSub>The last 24 hours</ListItemSub>
        </Link>
      </Flex>
    </NavbarContainer>
  );
}

export default NavbarTransaction;

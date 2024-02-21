import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = styled.ul`
  display: flex;
  gap: 2rem;
  padding-inline: 10rem;
`;

const ListItem = styled.li`
  font-size: 1.5rem;
  font-weight: 600;
  color: #c2dee9;
  border-bottom: solid 3px #c2dee9;
  margin-top: 1rem;
  cursor: pointer;
`;

const ListItemSub = styled(ListItem)`
  border-bottom: none;
  margin-top: 0rem;
  text-align: left;
  color: #7fc7e3;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Flex>
        <ListItem>Biggest Buy</ListItem>
        <ListItemSub>Today</ListItemSub>
      </Flex>
      <Flex>
        <ListItem>Biggest Sell</ListItem>
        <ListItemSub>Today</ListItemSub>
      </Flex>
    </NavbarContainer>
  );
}

export default Navbar;

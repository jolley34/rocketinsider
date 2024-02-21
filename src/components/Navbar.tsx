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
  font-size: 1.25rem;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Flex>
        <ListItem>Largest purchase</ListItem>
        <ListItemSub>Today</ListItemSub>
      </Flex>
      <Flex>
        <ListItem>Largest sell</ListItem>
        <ListItemSub>Today</ListItemSub>
      </Flex>
    </NavbarContainer>
  );
}

export default Navbar;

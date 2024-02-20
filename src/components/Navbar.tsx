import styled from "styled-components";

const NavbarContainer = styled.ul`
  display: flex;
  gap: 2rem;
`;

const ListItem = styled.li`
  font-size: 1.5rem;
  font-weight: 400;
  color: #7fc7e3;
  border: solid 2px #7fc7e3;
  padding: 1rem;
  cursor: pointer;
`;

const ListItemColorSwitch = styled(ListItem)`
  background-color: transparent;
  border: solid 2px #c2dee9;
  color: #c2dee9;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <ListItemColorSwitch>Nya resturanger</ListItemColorSwitch>
      <ListItem>Öppnar Snart</ListItem>
    </NavbarContainer>
  );
}

export default Navbar;

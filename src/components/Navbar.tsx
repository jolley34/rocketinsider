import styled from "styled-components";

const NavbarContainer = styled.ul`
  display: flex;
  gap: 2rem;
  padding-inline: 10rem;
`;

const ListItem = styled.li`
  font-size: 1.5rem;
  font-weight: 400;
  color: #7fc7e3;
  border: solid 2px #7fc7e3;
  border-radius: 0px 5px 0px 5px;
  padding: 1rem;
  cursor: pointer;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <ListItem>Nya resturanger</ListItem>
      <ListItem>Öppnar Snart</ListItem>
    </NavbarContainer>
  );
}

export default Navbar;

import styled from "styled-components";
import NavbarHome from "../../components/NavbarHome";
import Header from "./Header";

const Flex = styled.section`
  display: flex;
  flex-direction: column;
`;

function Home() {
  return (
    <Flex>
      <Header />
      <NavbarHome />
    </Flex>
  );
}

export default Home;

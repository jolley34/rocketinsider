import styled from "styled-components";
import Header from "./Header";
import Navbar from "./Navbar";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(25, 25, 25);
`;

const Flex = styled.section`
  display: flex;
  flex-direction: column;
`;

function HomePage() {
  return (
    <Root>
      <Flex>
        <Header />
        <Navbar />
      </Flex>
    </Root>
  );
}

export default HomePage;

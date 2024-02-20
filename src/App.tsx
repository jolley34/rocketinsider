import styled from "styled-components";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(25, 25, 25);
`;

const Flex = styled.section`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Root>
      <Flex>
        <Header />
        <Navbar />
      </Flex>
    </Root>
  );
}

export default App;

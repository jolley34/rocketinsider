import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Header from "./Header";

const Flex = styled.section`
  display: flex;
  flex-direction: column;
`;

function HomePage() {
  return (
    <Flex>
      <Header />
      <Navbar />
    </Flex>
  );
}

export default HomePage;

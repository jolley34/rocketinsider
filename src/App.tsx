import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(25, 25, 25);
`;

const Footer = styled.div`
  background-color: rgb(25, 25, 25);
  padding: 4rem;
`;

function App() {
  return (
    <>
      <Root>
        <Outlet />
      </Root>
    </>
  );
}

export default App;

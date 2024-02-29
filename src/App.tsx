import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavbarContextProvider from "./Contexts/NavbarContext";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(25, 25, 25);
`;

function App() {
  return (
    <>
      <Root>
        <NavbarContextProvider>
          <Outlet />
        </NavbarContextProvider>
      </Root>
    </>
  );
}

export default App;

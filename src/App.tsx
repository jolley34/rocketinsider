import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavbarContextProvider from "./Contexts/NavbarContext";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #53626d;
  background-image: linear-gradient(
    43deg,
    #53626d 0%,
    #508ca8 46%,
    #e5cc9d 100%
  );
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

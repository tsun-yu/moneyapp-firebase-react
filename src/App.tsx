import { RouterProvider } from "react-router-dom";
import router from "src/router";
import "./App.scss";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import styled from "styled-components";
import { useState } from "react";
import classNames from "classnames";

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem minmax(0, 1fr);
  grid-template-columns: 4.875rem minmax(0, 1fr);
  transition: 0.3s ease-in;
  overflow: hidden;
  padding: 0 2rem 2rem 0.75rem;

  grid-template-areas:
    "header header"
    "aside main ";

  &.expand {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
`;

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const gridClass = classNames({ expand: isChecked });

  return (
    <Body className={gridClass}>
      <Header isChecked={isChecked} setIsChecked={setIsChecked} />
      <Sidebar />
      <RouterProvider router={router} />
    </Body>
  );
}

export default App;

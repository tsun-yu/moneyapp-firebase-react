import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Hamburger from "./Hamburger";

interface HeaderProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.header`
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  grid-area: header;
  padding-left: 1.125rem;

  .header__logo {
    font-size: 1.5rem;
    color: #555;
  }
`;

function Header(props: HeaderProps) {
  return (
    <Container>
      <Hamburger {...props} />
      <h1 className="header__logo">MoneyAPP - React</h1>
    </Container>
  );
}

export default Header;

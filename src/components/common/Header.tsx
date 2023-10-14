import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import { TbBrandFirebase } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { auth } from "src/util/firebase";

interface HeaderProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.header`
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  padding-left: 1.125rem;

  div {
    display: flex;
    align-items: center;

    .header__logo {
      font-size: 1.5rem;
      color: #555;
      display: flex;
      align-items: center;
    }
  }
  .header__member {
    font-size: 1.5rem;
    color: #555;
    cursor: pointer;
  }
`;

function Header(props: HeaderProps) {
  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <Container>
      <div>
        <Hamburger {...props} />
        <h1 className="header__logo">
          <TbBrandFirebase />
          Firebase - React
        </h1>
      </div>
      <div className="header__member" onClick={logOut}>
        <BsPersonCircle />
      </div>
    </Container>
  );
}

export default Header;

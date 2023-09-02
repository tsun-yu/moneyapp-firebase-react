import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface HeaderProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenu = styled.div`
  input {
    display: none;

    &:checked + label > div {
      width: 0;
    }

    &:checked + label > div::before {
      margin-top: 0;
      transform: rotate(-45deg);
    }
    &:checked + label > div::after {
      margin-top: 0;
      transform: rotate(45deg);
    }
  }
  label {
    margin-right: 0.5rem;
    height: 1.375rem;
    width: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    div {
      width: 1rem;
      background-color: #555;
      display: block;
      position: absolute;
      transition: ease-in 0.3s;
      height: 0.125rem;
      transition: all.3s ease-in;

      &::before,
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 1.5rem;
        height: 0.125rem;
        background-color: #555;
        transition: all.3s ease-in;
      }
      &::before {
        margin-top: 0.5rem;
      }
      &::after {
        margin-top: -0.5rem;
      }
    }
  }
`;

function Hamburger(props: HeaderProps) {
  const { isChecked, setIsChecked } = props;

  return (
    <BurgerMenu>
      <input
        type="checkbox"
        id="burgerToggle"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <label htmlFor="burgerToggle">
        <div></div>
      </label>
    </BurgerMenu>
  );
}

export default Hamburger;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const CustomButton = styled.button`
  background-color: var(--btn-secondary);
  width: 100%;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  color: #001d35;
  transition: box-shadow 0.08s linear,
    min-width 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302),
      0 4px 8px 3px rgba(60, 64, 67, 0.149);
  }

  &:active {
    background-color: var(--btn-secondary-active);
  }
`;

function Button(props: ButtonProps) {
  const { label, onClick } = props;

  return <CustomButton onClick={onClick}>{label}</CustomButton>;
}

export default Button;

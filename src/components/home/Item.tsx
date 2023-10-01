import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
interface ItemProps {
  item: string;
  date: string;
  dollar: number;
}

const Card = styled.div`
  /* background-color: #d2e3fc; */
  background-color: var(--input-secondary);
  border-radius: 1.5rem;
  padding: 1rem;

  &:hover {
    background-color: var(--card-hover);
  }

  p {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    background-color: var(--btn-primary);
  }

  h2 {
    margin-block: 0.5rem;
  }

  .btnGroup {
    display: flex;
    margin-top: 1.5rem;

    div {
      flex: 1;
      display: flex;
      justify-content: center;

      span {
        cursor: pointer;
        padding: 0.5rem 1.5rem;
        border-radius: 2rem;
        background-color: var(--link-hover);

        &:hover {
          background-color: var(--btn-secondary);
        }
        &:active {
          background-color: var(--btn-secondary-active);
        }
      }
    }
  }
`;

function Item(props: ItemProps) {
  const { item, dollar, date } = props;

  return (
    <div>
      <Card>
        <p>{date}</p>
        <h2>{item}</h2>
        <h3>NTD {dollar}</h3>
        <div className="btnGroup">
          <div>
            <span>Edit</span>
          </div>
          <div>
            <span>Delete</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Item;

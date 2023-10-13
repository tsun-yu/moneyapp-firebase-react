import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "src/util/firebase";
import classNames from "classnames";
interface ItemProps {
  item: string;
  date: string;
  dollar: string;
  id: string;
  getData: () => Promise<void>;
}

const Card = styled.div`
  /* background-color: #d2e3fc; */
  background-color: var(--input-secondary);
  border-radius: 1.5rem;
  padding: 1rem;

  &:hover,
  &.active {
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
    font-size: 1.5rem;

    input {
      font-size: 1.5rem;
      height: 2rem;
    }
  }

  h3 {
    display: flex;
    align-items: center;
    font-size: 1.25rem;

    input {
      font-size: 1.25rem;
    }
  }

  h2,
  h3 {
    input {
      width: 100%;
      border: none;
      font-weight: 700;
      background: none;
      box-shadow: 0 0.125rem #edf2fa;

      &:focus-visible {
        outline: none;
        background-color: none;
        box-shadow: 0 0.125rem var(--input-border-focus);
      }
    }
  }

  .btnGroup {
    display: flex;
    margin-top: 1.5rem;
    gap: 0.5rem;

    div {
      flex: 1;
      display: flex;
      justify-content: center;
      padding: 0.5rem 0;
      border-radius: 2rem;
      background-color: var(--link-hover);
      cursor: pointer;

      &:hover {
        background-color: var(--btn-secondary);
      }
      &:active {
        background-color: var(--btn-secondary-active);
      }
    }
  }
`;

function Item(props: ItemProps) {
  const { item, dollar, date, id, getData } = props;
  const [itemTemp, setItemTemp] = useState(item);
  const [dollarTemp, setDollarTemp] = useState(dollar);
  const [isEdit, setIsEdit] = useState(false);
  const itemInputRef = useRef(null);
  useEffect(() => {
    // itemInputRef.focus()
    console.log(itemInputRef);
  }, [isEdit]);
  const deleteData = async (id: string) => {
    await deleteDoc(doc(db, "account", id));
    await getData();
  };
  const updateData = async (id: string) => {
    const docRefWithId = doc(db, "account", id);
    await updateDoc(docRefWithId, {
      item: itemTemp,
      dollar: dollarTemp,
    });
    await getData();
    isEditToggle();
  };
  const cancelEdit = () => {
    setItemTemp(item);
    setDollarTemp(dollar);
    isEditToggle();
  };
  const isEditToggle = () => {
    setIsEdit((prev) => !prev);
  };
  const handleItemNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setItemTemp(event.target.value);
  };
  const handleDollarChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.target.value = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^0+/, "");
    setDollarTemp(event.target.value);
  };
  const enterKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      updateData(id);
    }
  };

  const cardClass = classNames({ active: isEdit });
  const display = (
    <>
      <p>{date}</p>
      <h2>{item}</h2>
      <h3>NTD&ensp;{dollar}</h3>
      <div className="btnGroup">
        <div onClick={isEditToggle}>
          <span>Edit</span>
        </div>
        <div onClick={() => deleteData(id)}>
          <span>Delete</span>
        </div>
      </div>
    </>
  );
  const editDisplay = (
    <>
      <p>{date}</p>
      <h2>
        <input
          type="text"
          value={itemTemp}
          ref={itemInputRef}
          onChange={handleItemNameChange}
          onKeyDown={enterKeyDown}
        />
      </h2>
      <h3>
        NTD&ensp;
        <input
          type="text"
          value={dollarTemp}
          onChange={handleDollarChange}
          onKeyDown={enterKeyDown}
        />
      </h3>
      <div className="btnGroup">
        <div onClick={() => updateData(id)}>
          <span>Save</span>
        </div>
        <div onClick={cancelEdit}>
          <span>Cancel</span>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Card className={cardClass}>{isEdit ? editDisplay : display}</Card>
    </div>
  );
}

export default Item;

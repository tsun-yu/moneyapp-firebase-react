import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../util/firebase";
import { BiAddToQueue } from "react-icons/bi";
import Item from "../components/home/Item";
interface ItemsType {
  item: string;
  dollar: number;
  date: string;
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-area: main;
  gap: 1rem;

  .input__container {
    flex: 0 0 4rem;
    /* background-color: var(--inputs-bg); */
    background-color: var(--input-secondary);
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-inline: 0.75rem;

    input {
      border: none;
      height: 2.75rem;
      padding-inline: 1.5rem;
      font-size: 1.25rem;
      color: #555;
      background-color: var(--inputs-bg);
      /* border-bottom: 0.125rem solid #ccc; */
      border: none;
      flex: 1 1;
      border-radius: 1.5rem;
      outline: 0.125rem solid #ccc;

      &::placeholder {
        color: #ccc;
      }

      &:focus-visible {
        outline: 0.125rem solid var(--input-border-focus);
        background-color: #fff;
      }

      &:not(:focus-visible):hover {
        outline: 0.125rem solid #aaa;
      }
    }

    button {
      height: 2.75rem;
      width: 2.75rem;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      background-color: var(--btn-primary);
      font-size: 1.5rem;
      color: #555;
      display: grid;
      place-items: center;

      &:active {
        background-color: #bce1c7;
      }
    }
  }
`;
const Container = styled.div`
  flex: 1 1;
  background-color: #fff;
  border-radius: 1.5rem;
  padding: 1rem;
  overflow: auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  grid-auto-rows: min-content;
`;

function Home() {
  const navigate = useNavigate();
  const checkSignedStatus = async () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/Login");
      }
    });
  };
  const [items, setItems] = useState<Array<ItemsType>>([]);
  const [itemName, setItemName] = useState("");
  const [dollar, setDollar] = useState("");

  checkSignedStatus();
  useEffect(() => {
    getData();
    // postData();
    // updateData();
    // deleteData();
  }, []);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "account"));
    const data = querySnapshot.docs.map((doc) =>
      doc.data()
    ) as Array<ItemsType>;
    setItems(data);
  };

  const postData = async () => {
    await setDoc(doc(collection(db, "account")), {
      dollar,
      item: itemName,
      date: "2022/02/12",
    });
    await getData();
  };

  const handleItemNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setItemName(event.target.value);
  };
  const handleDollarChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDollar(event.target.value);
  };

  return (
    <Main>
      <Container>
        {items.map((v, i) => {
          const monDay = `${v.date.split("/")[1]}/${v.date.split("/")[2]}`;
          return (
            <Item
              item={v.item}
              dollar={v.dollar}
              date={monDay}
              key={v.date + v.item}
            />
          );
        })}
      </Container>
      <div className="input__container">
        <input
          type="text"
          id="expenseItem"
          placeholder="Item"
          onChange={handleItemNameChange}
          value={itemName}
        />
        <input
          type="text"
          id="expenseDollar"
          placeholder="Dollars"
          onChange={handleDollarChange}
          value={dollar}
        />
        <button onClick={postData}>
          <BiAddToQueue />
        </button>
      </div>
    </Main>
  );
}

export default Home;

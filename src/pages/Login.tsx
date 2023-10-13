import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, redirect } from "react-router-dom";
import styled from "styled-components";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../util/firebase";
import Button from "../components/Button";

const Container = styled.div`
  background-color: var(--bg-secondary);
  /* width: 100vw; */
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginElement = styled.div`
  /* background-color: var(--bg-secondary); */
  background-color: #fff;
  border-radius: 1.5rem;
  width: min(90%, 400px);
  padding: 2rem 2rem 1rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .login__input {
    margin-bottom: 1rem;
    font-size: 1.125rem;

    label {
      display: block;
    }
    input {
      /* background-color: var(--bg-secondary); */
      border: none;
      border-bottom: 2px solid rgba(60, 64, 67, 0.08);
      padding: 0.5rem 0.5rem 0.5rem 0;
      width: 100%;
      transition: 0.3s ease-in;
      font-size: 1.125rem;
    }

    input:focus-visible {
      outline: none;
      border-bottom: 2px solid var(--input-secondary);
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const checkSignedStatus = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        setIsLogin(false);
      }
    });
  };
  checkSignedStatus();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // setIsAuth(auth.currentUser);
      navigate("/");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // errorCode === "auth/wrong-password"
      //   ? alert("Wrong Password")
      //   : alert(`${errorCode}: ${errorMessage}`);
      // throw new Error(`${errorCode}: ${errorMessage}`);
    }
  };
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin1234");
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };
  const handleLoginClick = () => {
    signIn(email, password);
  };

  return (
    <Container>
      {!isLogin ? (
        <LoginElement>
          <h2>Login</h2>
          <div className="login__input">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div className="login__input">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleLoginClick();
              }}
            />
          </div>
          <div className="login__input">
            <Button label="LOGIN" onClick={handleLoginClick} />
            {/* <button onClick={handleLoginClick}>LOGIN</button> */}
          </div>
        </LoginElement>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Login;

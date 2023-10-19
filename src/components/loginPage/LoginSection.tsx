import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { errorMessages } from "src/util/errorMessages";
import { auth } from "src/util/firebase";
import styled from "styled-components";
import Button from "../Button";
import classNames from "classnames";

interface LoginSectionProps {
  label: string;
  hasMember: boolean;
}

function LoginSection(props: LoginSectionProps) {
  const { label, hasMember } = props;
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin1234");
  const [confirm, setConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // setIsAuth(auth.currentUser);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      const customErrorMessage =
        errorMessages[errorCode] || `${errorCode}: ${errorMessage}`;
      setErrMsg(customErrorMessage);
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // setIsAuth(auth.currentUser);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      const customErrorMessage =
        errorMessages[errorCode] || `${errorCode}: ${errorMessage}`;
      setErrMsg(customErrorMessage);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };
  const handleConfirmChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfirm(event.target.value);
  };
  const handleLoginClick = () => {
    if (!hasMember && password !== confirm) {
      setErrMsg("Passwords didn't match. Try again.");
      return;
    }

    hasMember ? signIn(email, password) : signUp(email, password);
  };
  const enterKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleLoginClick();
    }
  };
  const emailInpClass = classNames({
    error:
      errMsg === "Account doesn't exist" ||
      errMsg === "That Email is taken. Try another.",
  });
  const passwordInpClass = classNames({
    error:
      errMsg === "Wrong Password" ||
      errMsg === "Passwords didn't match. Try again.",
  });
  const confirmInpClass = classNames({
    error: errMsg === "Passwords didn't match. Try again.",
  });

  return (
    <>
      {errMsg ? <ErrorMessage>{errMsg}</ErrorMessage> : <></>}
      <LoginElement>
        <h2>{label}</h2>
        <div className="login__input">
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            onKeyDown={enterKeyDown}
            className={emailInpClass}
          />
        </div>
        <div className="login__input">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            onKeyDown={enterKeyDown}
            className={passwordInpClass}
          />
        </div>
        {!hasMember ? (
          <div className="login__input">
            <input
              type="password"
              id="confirm"
              placeholder="Confirm"
              onChange={handleConfirmChange}
              value={confirm}
              onKeyDown={enterKeyDown}
              className={confirmInpClass}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="login__input">
          <Button label={label.toUpperCase()} onClick={handleLoginClick} />
        </div>
      </LoginElement>
    </>
  );
}

export default LoginSection;

const ErrorMessage = styled.div`
  width: 100%;
  border-radius: 1.5rem;
  background-color: var(--color-error-container);
  color: var(--color-error);
  font-size: 1.125rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const LoginElement = styled.div`
  /* background-color: var(--bg-secondary); */
  background-color: #fff;
  border-radius: 1.5rem;
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

      &.error {
        border-bottom: 2px solid var(--color-error);
      }

      &:focus-visible {
        outline: none;
      }

      &:not(.error):focus-visible {
        border-bottom: 2px solid var(--input-secondary);
      }
    }
  }
`;

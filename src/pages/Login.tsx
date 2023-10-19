import classNames from "classnames";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSection from "../components/loginPage/LoginSection";
import { auth } from "../util/firebase";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [hasMember, setHasMember] = useState(true);
  const loginClass = classNames({ active: hasMember }, "switch__option");
  const signupClass = classNames({ active: !hasMember }, "switch__option");
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

  useEffect(() => {
    checkSignedStatus();
  }, []);

  const hasMemeberToggle = () => {
    setHasMember((prev) => !prev);
  };

  return (
    <Container>
      <div className="login">
        <div className="switch">
          <div className={loginClass} onClick={hasMemeberToggle}>
            Log In
          </div>
          <div className={signupClass} onClick={hasMemeberToggle}>
            Sign Up
          </div>
        </div>
        {hasMember ? (
          <LoginSection label="Login" hasMember={hasMember} />
        ) : (
          <LoginSection label="Signup" hasMember={hasMember} />
        )}
      </div>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  background-color: var(--bg-secondary);
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  justify-content: center;

  .login {
    width: min(100%, 400px);

    .switch {
      background-color: var(--input-secondary);
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.625rem;
      margin-bottom: 1rem;

      .switch__option {
        flex: 1 1 100%;
        display: flex;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 600;
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        cursor: pointer;

        &.active {
          background-color: var(--card-hover);
          color: var(--color-primary);
        }

        &:hover:not(.active) {
          background-color: #ffffff75;
        }
      }
    }
  }
`;

import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: var(--bg-secondary);
  height: 100vh;
  display: grid;
  justify-content: center;
`;

const ErrorElement = styled.div`
  margin-top: 4rem;

  img {
    width: min(100%, 40rem);
    display: block;
    margin-inline: auto;
  }
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
  }
`;

const ErrorPage = () => {
  const error: any = useRouteError();
  const errorStatus: number = error.status;
  const errorStatusText: string = error.statusText;

  return (
    <Container id="error-page">
      <ErrorElement>
        {errorStatus === 404 ? (
          <img src="https://i.imgur.com/lTwuDZa.png" alt="" />
        ) : (
          <h1>Oops!</h1>
        )}
        <p>{error ? `${errorStatusText}` : "Unexpected Error"}</p>
      </ErrorElement>
    </Container>
  );
};
export default ErrorPage;

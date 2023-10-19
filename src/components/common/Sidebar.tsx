import styled from "styled-components";
import { SiSvelte, SiReact, SiVuedotjs } from "react-icons/si";
import { BiLogoVuejs } from "react-icons/bi";

const Aside = styled.aside`
  margin-right: 1rem;
  overflow: hidden;
  grid-area: aside;

  a {
    text-decoration: none;
    color: #555;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-radius: 2rem;
    white-space: nowrap;

    p {
      display: flex;
      align-items: center;
      margin-right: 1.125rem;
      font-size: 1.5rem;
    }

    &:hover:not(.aside__link--active) {
      background-color: var(--link-hover);
    }
  }
  .aside__link--active {
    background-color: var(--btn-secondary);
    font-weight: 700;
    color: #222;
  }
`;

function Sidebar() {
  return (
    <Aside>
      <a className="aside__link--active" href="">
        <p>
          <SiReact />
        </p>
        FireBase - React
      </a>
      <a href="">
        <p>
          <SiVuedotjs />
        </p>
        Vue3 (Coming soon)
      </a>
      <a href="">
        <p>
          <SiSvelte />
        </p>
        Svelte (Coming soon)
      </a>
    </Aside>
  );
}

export default Sidebar;

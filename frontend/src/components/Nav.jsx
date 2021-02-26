import React from "react";
import "../styles/nav.scss";

const Nav = () => {
  return (
    <nav>
      {/* TODO: Logo? */}
      <h1>Epic Seven RTA Stats</h1>
      <menu>
        <li>
          <a
            href="https://github.com/dowinterfor6/e7-rta-stats"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.reddit.com/r/EpicSeven/"
            target="_blank"
            rel="noreferrer"
          >
            Epic Seven Reddit
          </a>
        </li>
      </menu>
    </nav>
  );
};

export default Nav;

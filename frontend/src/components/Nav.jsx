import React from "react";
import "../styles/nav.scss";

const Nav = () => {
  return (
    <nav>
      {/* TODO: Logo? */}
      <div className="nav-logo">
        <img src="/images/ras_emote.gif" alt="Ras Laugh" />
        <h1>RTA Stats</h1>
      </div>
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

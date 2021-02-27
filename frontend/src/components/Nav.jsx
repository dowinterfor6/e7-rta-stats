import React from "react";
import RedditIcon from "@material-ui/icons/Reddit";
import GitHubIcon from "@material-ui/icons/GitHub";

const Nav = () => {
  return (
    <nav>
      <div className="nav-logo">
        <img src="/images/ras_emote.gif" alt="Ras Laugh" />
        <h1>Epic 7 RTA Stats</h1>
      </div>
      <menu>
        <li>
          <a
            href="https://github.com/dowinterfor6/e7-rta-stats"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </li>
        <li>
          <a
            href="https://www.reddit.com/r/EpicSeven/"
            target="_blank"
            rel="noreferrer"
          >
            <RedditIcon />
          </a>
        </li>
        <li className="desktop">
          <a
            href="https://github.com/dowinterfor6/e7-rta-stats"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li className="desktop">
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

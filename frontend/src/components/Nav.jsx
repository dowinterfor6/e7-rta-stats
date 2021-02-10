import React from "react";
import "../styles/nav.scss";

const Nav = () => {
  return (
    <nav>
      {/* TODO: Logo? */}
      <h1>E7 RTA Stats</h1>
      <menu>
        <li>Donate</li>
        <li>Github</li>
        <li>E7 Reddit</li>
      </menu>
    </nav>
  )
}

export default Nav;
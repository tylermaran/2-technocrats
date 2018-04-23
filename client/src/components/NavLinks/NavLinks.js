import React from "react";
// import { Link } from "react-router-dom";
import "./NavLinks.css";
console.log("testing!!!");
// Depending on the current path, this component sets the "active" classNameName on the appropriate navigation link item
const NavLinks = props => (
  <div onClick={() => props.handleClick(props.id)}>
      <ul className="nav bd-sidenav">
        <li className="bd-toc-link active">{props.name}</li>
      </ul>
  </div>
);

export default NavLinks;

import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import {Collapse} from 'react-bootstrap';
import NavLinks from "../NavLinks";
import "./Navbar.css"; 
import stocks from "../../stocks.json";

// Depending on the current path, this component sets the "active" classNameName on the appropriate navigation link item
const Navbar = props => (

  <div className="col-4 col-lg-3 bd-sidebar" id="bd-docs-nav">
    <nav>
      <div className="bd-toc-item" id="brandName">
        Tech Square Investments
      </div>
      <div className="bd-toc-item" id="studentName">
        John J. Schmidt
      </div>
      <div className="bd-toc-item" id="studentName">
        Class #123
      </div>
    </nav>
   {stocks.map(stock => ( 
      <NavLinks 
        handleClick={props.handleClick}
        name={stock.name}
        id={stock.id}
     /> 
    
    ))} 
    </div>

  
  


  // <nav classNameNameName="navbar navbar-default">
  //   <div classNameNameName="container-fluid">
  //     <div classNameNameName="navbar-header">
  //       <Link classNameNameName="navbar-brand" to="/">
  //         Tech Square Investments
  //       </Link>
  //     </div>
  //     <ul classNameNameName="nav navbar-nav">
  //       <li
  //         classNameNameName={  //           window.location.pathname === "/" || window.location.pathname === "/about"
  //             ? "active"
  //             : ""
  //         }
  //       >
  //         <Link to="/">About</Link>
  //       </li>
  //       <li classNameNameName={window.location.pathname === "/discover" ? "active" : ""}>
  //         <Link to="/discover">Discover</Link>
  //       </li>
  //       <li classNameNameName={window.location.pathname === "/search" ? "active" : ""}>
  //         <Link to="/search">Search</Link>
  //       </li>
  //     </ul>
  //   </div>
  // </nav>
);

export default Navbar;

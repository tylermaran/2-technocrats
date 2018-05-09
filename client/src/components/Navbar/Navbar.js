import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import {Collapse} from 'react-bootstrap';
import NavLinks from "../NavLinks";
import "./Navbar.css";
import stocks from "../../stocks.json";

// Depending on the current path, this component sets the "active" classNameName on the appropriate navigation link item
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
            handleClick={this.props.handleClick}
            name={stock.name}
            id={stock.id}
            />
        ))}
      </div>
    )}
  };

  export default Navbar;

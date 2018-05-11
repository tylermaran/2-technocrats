import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link, withRouter } from "react-router-dom";
// import {Collapse} from 'react-bootstrap';
import NavLinks from "../NavLinks";
import "./Navbar.css";
// import stocks from "../../stocks.json";

// Depending on the current path, this component sets the "active" classNameName on the appropriate navigation link item
class Navbar extends React.Component {
  

  componentDidMount(){
    // console.log(this.state.props)
  }
  render() {
    const { user } = this.props.auth
    // const stocks = {};
    return (
      <div className="col-4 col-lg-3 bd-sidebar" id="bd-docs-nav">
        <nav>
          
          <div className="bd-toc-item" id="studentName">
            Welcome {user.name}
          </div>
          <div className="bd-toc-item" id="studentName">
            Class #123
          </div>
        </nav>
        {this.props.portfolio.map(stock => (
          <NavLinks
            handleClick={this.props.handleClick}
            name={stock.name}
            id={stock.id}
            />
        ))}
      </div>
    )}
  };

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {})(Navbar);

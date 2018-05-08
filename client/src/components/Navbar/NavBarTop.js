import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          > 
            <img
              src={user.avatar}
              className="rounded-circle"
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="you must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="navbar-brand" to="/">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navbar-brand" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-toggleable-sm sticky-top navbar-inverse bg-primary">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="navbar-brand" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
      // <nav className="navbar navbar-toggleable-md navbar-dark bg-dark mb-4">
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarTogglerDemo01"
      //     aria-controls="navbarTogglerDemo01"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon" />
      //   </button>
      //   <div className="collapse navbar-collapse" id="mobile-nav">
      //     <Link className="navbar-brand" to="/">
      //       Profile
      //     </Link>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#mobile-nav"
      //     >
      //       <span className="navbar-toggler-icon" />
      //     </button>

      //     {/* <div className="collapse navbar-collapse" id="mobile-nav"> */}
      //     {isAuthenticated ? authLinks : guestLinks}
      //     {/* </div> */}
      //   </div>
      // </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

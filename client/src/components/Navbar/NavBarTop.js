import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {
  render() {

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Profile
          </Link>
          <Link className="navbar-brand" to="/">
            Login
          </Link>
          <Link className="navbar-brand" to="/">
            Register
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    );
  }
}

// Navbar.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default Navbar;

// export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
//   Navbar
// );

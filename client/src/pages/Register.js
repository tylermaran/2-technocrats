import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBarTop from "../components/Navbar/NavBarTop.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import Spinner from "../components/Spiner";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //if logged in and trying to go to the login page redirect to profile page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
    console.log("did mount");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false })
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const loadingSpinner = <Spinner />

    return (
      <div>
        <NavBarTop />
        <div className="container margin-top">
          <div className="row justify-content-center">
            <div className="col-5 m-auto">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Name</label>

                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.name
                    })}
                    type="name"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback" style={{ color: "red" }}>
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Email</label>

                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    type="email"
                    id="email"
                    placeholder="example@example.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div style={{ color: "red" }} className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>

                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div style={{ color: "red" }} className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.password2
                    })}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    id="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback" style={{ color: "red" }}>
                      {errors.password2}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn align-middle btn-primary float-left">
                  Submit
                </button>
                {this.state.loading ? loadingSpinner : ""}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

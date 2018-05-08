import React, { Component } from "react";
import NavBarTop from "../components/Navbar/NavBarTop.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import "../index.css";
import Spinner from '../components/Spiner'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
    console.log(this.state)
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userFormData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userFormData);
    this.setState({ loading: true});
    console.log(this.state)
  }

  render() {
    const { errors } = this.state;

    const loadingSpinner = (<Spinner />);

    return (
      <div>
        <NavBarTop />
        <div className="container margin-top">
          <div className="row justify-content-center">
            <div className="col-8 m-auto text-center">
              <form
                className="form-inline justify-content-center"
                onSubmit={this.onSubmit}
              >
                <div className="form-group row">
                  <p className="col-12 col-form-label text-center" for="email">
                    Email
                  </p>
                  <div className="col-12">
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
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <p className="col-12 col-form-label text-center" for="email">
                    Password
                  </p>
                  <div className="col-12">
                    <input
                      className={classnames("form-control", {
                        "is-invalid": errors.password
                      })}
                      type="password"
                      placeholder="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

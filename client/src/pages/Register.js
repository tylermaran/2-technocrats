import React, { Component } from "react";
import NavBarTop from "../components/Navbar/NavBarTop.js";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state; 

    return (
      <div>
        <NavBarTop />
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <p className="col-2 col-form-p">Name</p>
              <div className="col-5">
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
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
            </div>
            <div className="form-group row">
              <p className="col-2 col-form-label">Email</p>
              <div className="col-5">
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
              <p className="col-2 col-form-label">Password</p>
              <div className="col-5">
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
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            </div>
            <div className="form-group row">
              <p className="col-2 col-form-label">Confirm Password</p>
              <div className="col-5">
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
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

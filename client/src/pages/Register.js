import React, { Component } from "react";
import NavBarTop from "../components/Navbar/NavBarTop.js";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwords: "",
      errors: {}
    };
  }

  render() {
    return (
      <div>
        <NavBarTop />
        <div className="container">
          <form>
            <div className="form-group row">
              <label for="example-email-input" className="col-2 col-form-label">
                Name
              </label>
              <div className="col-10">
                <input 
                className="form-control" 
                type="name" 
                id="input" 
                placeholder="First and Last Name"
                name="name"
                value={this.state.name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-email-input" className="col-2 col-form-label">
                Email
              </label>
              <div className="col-10">
                <input 
                className="form-control" 
                type="email" 
                id="input" 
                placeholder="example@example.com"
                name="email"
                value={this.state.email}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="example-password-input"
                className="col-2 col-form-label"
              >
                Password
              </label>
              <div className="col-10">
                <input
                  className="form-control"
                  type="password"
                  placeholder="12345"
                  id="password2"
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="example-password-input"
                className="col-2 col-form-label"
              >
                Re Enter Password
              </label>
              <div className="col-10">
                <input
                  className="form-control"
                  type="password"
                  placeholder="12345"
                  id="password2"
                  value={this.state.password2}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

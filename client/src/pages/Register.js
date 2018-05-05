import React, { Component } from "react";
import NavBarTop from '../components/Navbar/NavBarTop.js'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwords: "",
      errors: {}
    }
  }

  render() {
    return (
      <div>
        <NavBarTop />
        <div className="container">
          <form>
            <div className="form-group row">
              <label for="example-email-input" className="col-2 col-form-label">
                Email
              </label>
              <div className="col-10">
                <input className="form-control" type="email" id="input" />
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
                  id="example-password-input"
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
                  id="example-password-input"
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

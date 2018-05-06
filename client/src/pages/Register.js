import React, { Component } from "react";
import NavBarTop from "../components/Navbar/NavBarTop.js";

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

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    console.log(newUser);
  }

  render() {
    return (
      <div>
        <NavBarTop />
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <p className="col-2 col-form-p">Name</p>
              <div className="col-5">
                <input
                  className="form-control"
                  type="name"
                  id="name"
                  placeholder="First and Last Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <p className="col-2 col-form-label">Email</p>
              <div className="col-5">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="example@example.com"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <p className="col-2 col-form-label">Password</p>
              <div className="col-5">
                <input
                  className="form-control"
                  type="password"
                  placeholder="12345"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <p className="col-2 col-form-label">Re Enter Password</p>
              <div className="col-5">
                <input
                  className="form-control"
                  type="password"
                  placeholder="12345"
                  name="password2"
                  id="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

import React, { Component } from "react";
import NavBarTop from "../components/Navbar/NavBarTop.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();

    const userFormData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userFormData);
  }

  render() {

    const { errors } = this.state;

    return (
      <div>
        <NavBarTop />
        <div className="container">
          <form onSubmit={this.onSubmit}>
         
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser })(Login);
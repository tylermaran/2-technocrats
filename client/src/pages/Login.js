import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Card, CardBody } from "reactstrap";
import NavBarTop from "../components/Navbar/NavBarTop.js";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import Spinner from "../components/Spiner";

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
    console.log(this.state);
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
    this.setState({ loading: true });
    console.log(this.state);
  }

  render() {
    const { errors } = this.state;

    const loadingSpinner = <Spinner />;

    return (
      <div>
        <Card narrow>
        <NavBarTop />
        <div className="container margin-top" style={{ marginTop: "50px" , fontFamily: "Open Sans"}}>
          <div className="row justify-content-center">
            <div className="col-5 m-auto">
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">

                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    type="email"
                    id="email"
                    placeholder="Email"
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
                <button style={{ paddingBottom: "30px" , backgroundColor: "#124257", borderColor: "#50ae54"}}
                  type="submit"
                  className="btn align-middle btn-primary float-left"
                >
                  Submit
                </button>
                {this.state.loading ? loadingSpinner : ""}
              </form>
              </CardBody>
            </div>
          </div>
        </div>
        </Card>
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

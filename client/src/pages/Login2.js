import React from "react";
import { field, reduxForm } from "redux-form";
import renderField from "component/ FormInputs/renderField";

const validate = values => {
  const errors = {};
  if (values.email !== undefined) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "password is required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }
  return errors;
};

const sumbitForm = values => {
  alert("You entered" + JSON.stringify(values, 0, 2));
  return false;
};

const LoginForm = ({ submitting, handleSubmit }) => (
  <div className="card">
    <div className="header">
      <h4>Login</h4>
    </div>

    <div className="content">
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-md-3 control-label">Email</label>

          <div className="col-md-9">
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3 control-label">Password</label>

          <div className="col-md-9">
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3" />

          <div className="col-md-9">
            <Field
              name="rememberMe"
              type="checkbox"
              component={renderField}
              label="Remember Me"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3" />

          <div className="col-md-9">
            <button type="submit" className="btn btn-fill btn-info">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default reduxForm({
  from: "LoginForm",
  validate
})(LoginForm);

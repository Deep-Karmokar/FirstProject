import React, { Component } from "react";
import "../../../src/styles.scss";
import "./../Login/Login";
import auth from "../../services/auth/auth";
import { Link } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      delete this.state.formErrors;
      auth
        .register(this.state)
        .then(user => {
          this.currentUser = auth.getCurrentUser();
          this.state.uid = this.currentUser.uid;
          delete this.state.password;
          auth
            .addUser(this.state)
            .then(() => {
              console.log("Successfully created user.");
            })
            .catch(error => {
              console.log(error);
            });
          document.querySelector(".alert").style.display = "block";
          setTimeout(function() {
            document.querySelector(".alert").style.display = "none";
          }, 3000);
        })
        .catch(e => {
          console.log(e);
          alert(e);
        });
    } else {
      console.error("FORM INVALID");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characters are required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characters are required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters are required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="alert">
          Successfully Registered! Please Login To Proceed
        </div>
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName"> First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                name="firstName"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName"> Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email"> Email</label>
              <input
                value={this.state.email}
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                value={this.state.password}
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>

          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="alreadyHaveAccount">
              <button>
                <small> Already have an account? Login</small>
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Register;

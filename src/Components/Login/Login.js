import React, { Component } from "react";
import "../../../src/styles.scss";
import auth from "../../services/auth/auth";
import { Link } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  navigateToRegister = () => {
    this.props.history.replace("/register");
  };

  handleSubmit = () => {
    auth
      .login(this.state)
      .then(() => {
        console.log("logged in");
        this.props.history.replace("/events");
      })
      .catch(e => {
        console.log(e);
        document.querySelector(".alertLogin").style.display = "block";
        setTimeout(function() {
          document.querySelector(".alertLogin").style.display = "none";
        }, 3000);
      });
  };

  handleChange = e => {
    e.preventDefault();
    const type = e.target.type;
    if (type === "text") {
      this.setState({
        email: e.target.value
      });
    } else {
      this.setState({
        password: e.target.value
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div class="alertLogin">
          Invalid Login Details! Please Check the information you provided.
        </div>
        <div className="form-wrapper">
          <h1>Login</h1>
          <div className="email">
            <label htmlFor="email"> Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div className="password">
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div className="createAccount">
            <button onClick={this.handleSubmit}>Login</button>
          </div>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <div className="alreadyHaveAccount">
              <button>
                <small> Dont have an account? Register here</small>
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;

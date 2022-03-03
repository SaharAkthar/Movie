import React, { Component } from "react";
import joi, { abort } from "joi-browser";
import * as userService from "../../services/userService";
import auth from "../../services/authService";
import Form from "./form";
class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: joi.string().required().email().label("Username"),
    password: joi.string().required().min(5).label("Password"),
    name: joi.string().required().label("name"),
  };
  username = React.createRef();
  // componentDidMount() {
  //   this.username.current.focus();
  // }
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithjwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h2>Register Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;

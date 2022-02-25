import React, { Component } from "react";
import joi, { abort } from "joi-browser";
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
  doSubmit() {
    console.log("Submitted");
  }
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

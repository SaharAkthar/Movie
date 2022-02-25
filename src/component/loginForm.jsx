import React, { Component } from "react";
import joi, { abort } from "joi-browser";
import Form from "./common/form";
class login extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: joi.string().required().label("Username"),
    password: joi.string().required().label("Password"),
  };
  username = React.createRef();
  // componentDidMount() {
  //   this.username.current.focus();
  // }
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateproperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //const username = this.username.current.value;
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
    this.doSubmit();
  };
  doSubmit() {
    console.log("Submitted");
  }
  render() {
    return (
      <div>
        <h2>LOgin</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default login;

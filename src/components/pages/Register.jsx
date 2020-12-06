import React from "react";
import axios from "axios";
import qs from "qs";

import FormInput from "./../form/FormInput";
import ErrorMsg from "../ErrorMsg";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userType: "both",
      organisation: "",
      email: "",
      password: "",
      formErr: "",
    };
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/v1/user/register",
        qs.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          userType: this.state.userType,
          organisation: this.state.organisation,
        })
      )
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Error in form, please check values",
          });
          return;
        }

        this.props.history.push("/login");
      })

      .catch((err) => {
        this.setState({
          formErr: "Error in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col items-center py-6"
          onSubmit={(e) => {
            this.handleFormSubmission(e);
          }}
        >
          <h1 className="  mb-10 text-center text-3xl font-bold justify-between">Register </h1>

          <FormInput
            type="text"
            label="First Name"
            name="firstName"
            id="firstName"
            onChange={(e) => {
              this.handleInputChange(e);
            }}
          />

          <FormInput
            type="text"
            label="Last Name"
            name="lastName"
            id="lastName"
            onChange={(e) => {
              this.handleInputChange(e);
            }}
          />

          <FormInput
            type="email"
            label="Email"
            name="email"
            id="email"
            onChange={(e) => {
              this.handleInputChange(e);
            }}
          />

          <FormInput
            type="password"
            label="Password"
            name="password"
            id="password"
            onChange={(e) => {
              this.handleInputChange(e);
            }}
          />

          {this.state.formErr !== "" ? <ErrorMsg msg={this.state.formErr} /> : ""}
          <button
            type="submit"
            className="w-40 rounded-lg py-1 px-3 mt-8 bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;

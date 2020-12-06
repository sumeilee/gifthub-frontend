import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import qs from "qs";
import moment from "moment";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

import FormInput from "./../form/FormInput";
import ErrorMsg from "../ErrorMsg";

import AuthContext from "../../contexts/AuthContext";

import {baseURL} from "../../services/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        `${baseURL}/user/login`,
        qs.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      )
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Error occurred in form, please check values",
          });
          return;
        }

        this.props.cookies.set("token", response.data.token, {
          path: "/",
          expires: moment.unix(response.data.expiresAt).toDate(),
        });

        this.context.setUser(jwt.decode(response.data.token));

        window.location.reload();
      })
      .catch((err) => {
        this.setState({
          formErr: "Error in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="h-full w-full bg-contain bg-center  ">
        <div className="h-full flex justify-center items-center">
          <form
            className="flex flex-col items-center py-6 "
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <h1 className="  mb-10 text-center text-3xl font-bold justify-between">Login</h1>

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

            {this.state.formErr !== "" ? (
              <ErrorMsg msg={this.state.formErr} />
            ) : (
              ""
            )}
            <button
              type="submit"
              className="text-white w-40 rounded-lg py-1 px-3 mt-8 bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(withCookies(Login));

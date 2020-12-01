import React from "react";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErr: "",
    };
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswrdChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/v1/user/login",
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

        // this.props.history.push("/user/dashboard");
        window.location.reload();
      })
      .catch((err) => {
        this.setState({
          formErr: "Error occurred in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8max-w-md w-full space-y-8">
        <div className="max-w-md w-full space-y-8">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>

          <form
            className="mt-5 mb-5"
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <div className="mt-8 space-y-6">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                placeholder="Email address"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handleEmailChange(e);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mt-8 space-y-6">
              <label htmlFor="exampleInputPassword1" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handlePasswrdChange(e);
                }}
                id="exampleInputPassword1"
              />
            </div>
            {this.state.formErr !== "" ? (
              <div className="form-group">
                <p>{this.state.formErr}</p>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className=" mt-8 space-y-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withCookies(Login));

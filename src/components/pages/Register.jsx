import React from "react";
import axios from "axios";
import qs from "qs";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userType: "",
      organisation: "",
      email: "",
      password: "",
      formErr: "",
    };
  }
  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value,
    });
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

  handleUserTypeChange(e) {
    this.setState({
      userType: e.target.value,
    });
  }
  handleOrganisationChange(e) {
    this.setState({
      organisation: e.target.value,
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
            formErr: "Error occurred in form, please check values",
          });
          return;
        }

        this.props.history.push("/login");
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
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register now to get started
          </h2>
          <form
            className="mt-5 mb-5"
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <div className="mt-8 space-y-6">
              <div className="rounded-md space-y-px">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(e) => {
                    this.handleFirstNameChange(e);
                  }}
                />
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handleLastNameChange(e);
                }}
              />
            </div>
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

            <div className="mt-8 space-y-6">
              <label for="userType" className="sr-only">
                User type
              </label>
              <select
                id="userType"
                placeholder="Please select user type"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  this.handleUserTypeChange(e);
                }}
              >
                <option>Please select user type</option>
                <option>requestor</option>
                <option>donor</option>
              </select>
            </div>
            <div className="mt-8 space-y-6">
              <label htmlFor="organisation" className="sr-only">
                Organisation (if applicable)
              </label>
              <input
                type="text"
                placeholder="Organisation (if applicable)"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handleOrganisationChange(e);
                }}
                id="organisation"
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
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

import React from "react";
import axios from "axios";
import qs from "qs";
import {withCookies} from "react-cookie";
import {baseURL} from "../../services/api";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        userType: "",
        organisation: "",
        email: "",
        password: "",
        formErr: "",
      },
    };
  }
  componentDidMount() {
    axios.defaults.headers.common["auth_token"] = this.props.cookies.get("token");

    axios
      .get(`${baseURL}/users/me`)

      .then((result) => {
        this.setState({
          user: result.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  handleFirstNameChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        first_name: e.target.value,
      },
    });
  }

  handleLastNameChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        last_name: e.target.value,
      },
    });
  }

  handleEmailChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        email: e.target.value,
      },
    });
  }

  handlePasswordChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value,
      },
    });
  }

  handleOrganisationChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        organisation: e.target.value,
      },
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();
    axios
      .patch(
        `${baseURL}/users/me`,
        qs.stringify({
          first_name: this.state.user.first_name,
          last_name: this.state.user.last_name,
          email: this.state.user.email,
          password: this.state.user.password,
          organisation: this.state.user.organisation,
        }),

        {
          headers: {
            auth_token: this.props.cookies.get("token"),
          },
        }
      )
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Update unsuccessful",
          });
          return;
        }
        console.log(response);
        this.props.history.push("/user/dashboard");
      })

      .catch((err) => {
        this.setState({
          formErr: "Error occurred in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="page-item container mx-auto px-10 flex flex-col">
        <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-yellow-300 border-opacity-75 shadow overflow-hidden">
          <h2 class="text-xl font-bold text-center">Edit Profile</h2>
          <form
            className="mt-5 mb-5"
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <div className="mt-8 space-y-6">
              <div className="rounded-md space-y-px">
                <label htmlFor="first_name" className="sr-only">
                  {this.state.user.first_name}
                </label>
                <input
                  type="text"
                  value={this.state.user.first_name}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(e) => {
                    this.handleFirstNameChange(e);
                  }}
                />
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <label htmlFor="last_name" className="sr-only"></label>
              <input
                type="text"
                value={this.state.user.last_name}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handleLastNameChange(e);
                }}
              />
            </div>
            <div className="mt-8 space-y-6">
              <label htmlFor="email" className="sr-only"></label>
              <input
                type="email"
                value={this.state.user.email}
                placeholder="New email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handleEmailChange(e);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mt-8 space-y-6">
              <label htmlFor="exampleInputPassword1" className="sr-only"></label>
              <input
                value={this.state.user.password}
                type="password"
                placeholder=" New Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => {
                  this.handlePasswordChange(e);
                }}
                id="exampleInputPassword1"
              />
            </div>

            <div className="mt-8 space-y-6">
              <label for="userType" className="sr-only">
                {this.state.user.userType}
              </label>
            </div>
            <div className="mt-8 space-y-6">
              <label htmlFor="organisation" className="sr-only">
                Organisation (if applicable)
              </label>
              <input
                value={this.state.user.organisation}
                type="text"
                placeholder="Organisation (if applicable)"
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
            <br />
            <p>*Changes made will only be reflected on the next login</p>
            <button
              type="submit"
              className=" mt-8 space-y-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withCookies(EditProfile);

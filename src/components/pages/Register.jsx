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
          <form
            className="mt-5 mb-5"
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <div className="mt-8 space-y-6">
              <div class="rounded-md space-y-px">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    this.handleFirstNameChange(e);
                  }}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleLastNameChange(e);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                onChange={(e) => {
                  this.handleEmailChange(e);
                }}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  this.handlePasswrdChange(e);
                }}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="form-group col-md-4">
              <label for="userType">User type</label>
              <select
                id="userType"
                onChange={(e) => {
                  this.handleUserTypeChange(e);
                }}
                className="form-control"
              >
                <option selected>Please select</option>
                <option>requestor</option>
                <option>donor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="organisation">Organisation (if applicable)</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOrganisationChange(e);
                }}
                className="form-control"
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
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

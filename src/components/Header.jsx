import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

import { baseURL } from "../../services/api";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      user: "",
    };
  }
  componentDidMount() {
    if (this.props.cookies.get("token") !== "") {
      axios
        .get(`${baseURL}/users/me`, {
          headers: {
            auth_token: this.props.cookies.get("token"),
          },
        })
        .then((result) => {
          if (result.data.success) {
            this.setState({
              user: result.data.user,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  handleMenuClick() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.cookies.remove("token", { path: "/" });
    window.location.href = "/";
  }

  render() {
    return (
      <div className="bg-pink-600 flex-none sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex justify-between h-20 items-centers px-6 py-4 sm:p-0">
          <div className="flex items-center">
            <Link to="/" className="block text-3xl block text-white font-bold">
              <img
                src="/giftHub_icon.png"
                className="inline"
                width="60"
                height="60"
                alt="gift"
              />
              giftHUB
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => this.handleMenuClick()}
              className="block text-gray-100 text-white text-white focus:outline-none"
            >
              <svg
                className="fill-current h-4 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {this.state.isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            this.state.isMenuOpen ? "block" : "hidden"
          } py-2 sm:block sm:flex sm:items-center`}
        >
          <Link
            to="/offers"
            className="block text-white font-semibold mx-3 my-1 px-4 py-2 rounded hover:bg-pink-700"
          >
            Offers
          </Link>
          <Link
            to="/requests"
            className="block text-white font-semibold mx-3 my-1 px-4 py-2 rounded hover:bg-pink-700"
          >
            Requests
          </Link>
          {!this.state.user ? (
            <div
              className={`${
                this.state.isMenuOpen ? "block" : "hidden"
              } py-2 sm:block sm:flex sm:items-center`}
            >
              <Link
                to="/login"
                className="block text-white font-semibold mx-3 my-1 px-4 py-2 rounded hover:bg-pink-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-800 font-semibold mx-3 my-1 px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-400"
              >
                Register
              </Link>
            </div>
          ) : (
            <div
              className={`${
                this.state.isMenuOpen ? "block" : "hidden"
              } py-2 sm:block sm:flex sm:items-center`}
            >
              <Link
                to="/mailbox"
                className="block text-white font-semibold mx-3 my-1 px-4 py-2 rounded hover:bg-pink-700"
              >
                Mailbox
              </Link>
              <a
                href="/"
                onClick={(e) => {
                  this.handleLogout(e);
                }}
                className="block text-white font-semibold mx-3 my-1 px-4 py-2 rounded hover:bg-pink-700"
              >
                Logout
              </a>

              <Link
                to="/user/dashboard"
                className="block text-gray-800 font-semibold mx-3 my-1 px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-400"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withCookies(Header));

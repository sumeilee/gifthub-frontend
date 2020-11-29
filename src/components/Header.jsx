import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  handleMenuClick() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    return (
      <div className="bg-pink-600 sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex justify-between h-20 items-centers px-6 py-4 sm:p-0">
          <div className="flex items-center">
            <Link to="/" className="block text-3xl block text-white font-bold">
              giftHUB
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => this.handleMenuClick()}
              className="block block text-gray-100 hover:block text-white focus:block text-white"
            >
              <svg
                className="fill-current h-4 w-6"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {this.state.isMenuOpen ? (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
      </div>
    );
  }
}

export default Header;

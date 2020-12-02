import React from "react";
import axios from "axios";
import {withCookies} from "react-cookie";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {first_name: ""},
      userItems: "",
    };
  }
  componentDidMount() {
    axios.defaults.headers.common["auth_token"] = this.props.cookies.get("token");
    axios
      .all([
        axios.get("http://localhost:5000/api/v1/users/me"),
        axios.get("http://localhost:5000/api/v1/users/items"),
      ])
      .then((responseArr) => {
        this.setState({
          user: responseArr[0].data.user,
          userItems: responseArr[1].data.items,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-">
        <header className="mx-auto px-2 flex items-center justify-start">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Hello, {this.state.user.first_name}!
          </h1>
          <button className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
            <svg
              className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
              width="12"
              height="20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
              />
            </svg>
            Add new item
          </button>
        </header>
        <div className="md:flex md:-mx-4">
          <div className="w-full mb-2 md:w-1/2 md:mx-4 border rounded shadow-sm">
            {this.state.userItems.length > 0 ? (
              this.state.userItems.map((items) => {
                return (
                  <div className="px-10 py-100">
                    <p className="font-semibold leading-tight text-2xl text-gray-800 hover:text-gray-800">
                      {items.title}
                    </p>
                    <li className="text-gray-900">{items.description}</li>
                  </div>
                );
              })
            ) : (
              <p> Nothing added </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default withCookies(Dashboard);

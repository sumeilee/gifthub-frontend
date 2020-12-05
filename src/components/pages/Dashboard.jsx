import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { withCookies } from "react-cookie";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { first_name: "" },
      userItems: [],
    };
  }
  componentDidMount() {
    axios.defaults.headers.common["auth_token"] = this.props.cookies.get(
      "token"
    );
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
      <div className="dashboard items-start w-full pt-4 container mx-auto px-10 flex flex-col">
        <table className="table-auto">
          <tbody>
            <tr className="w-full  h-10">
              <td>
                <div className="text-3xl font-bold text-center">
                  Hello, {this.state.user.first_name}!
                  <Link to="/user/editprofile">
                    <button
                      className="transform hover:scale-150 pl-2 pt-2 mb-0 ml-2 pb-0 pt-0"
                      title="Edit profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="20"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <div className=" text-gray-700 pt-0 pl-1 text-xl font text-center">
          Items listed
          <Link to="/items/new">
            <button
              className=" transform hover:scale-150 pl-0 pt-0 mt-2 mb-0 ml-2 pb-0 pt-0"
              title="Add item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="17"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-3">
          {this.state.userItems.length > 0 ? (
            this.state.userItems.map((items) => {
              return (
                <div className=" container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-green-500 border-opacity-75 shadow overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <p className="text-base font-bold tracking-wider">
                        {items.title}
                      </p>
                      <p>
                        Date posted:{" "}
                        {new Date(items.createdAt).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="break-words">
                        Description: {items.description}
                      </p>
                      <p>Category: {items.category}</p>
                      <p>Post type: {items.postType}</p>
                      <p>
                        Tags: {items.tags}
                        <br />
                      </p>
                      <br />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <p>
                        Status: <b>{items.status}</b>
                      </p>
                      <p>
                        Delivery: <b>{items.delivery}</b>
                      </p>
                      <br />
                    </div>
                    <Link
                      to={{
                        pathname: `/items/${items._id}/edit`,
                      }}
                      className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 hover:no-underline hover:text-gray-800"
                    >
                      Edit
                    </Link>{" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-red-400 hover:bg-red-5  00"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No offers found.</p>
          )}
        </div>
        <br />
      </div>
    );
  }
}

export default withCookies(Dashboard);

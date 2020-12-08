import React from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
// import css later

import api from "../../services/api";

class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      // me: {},
      user: null,
    };
  }

  componentDidMount() {
    const token = this.props.cookies.get("token");
    // const me = jwt.decode(token);
    let user = null;
    if (token) {
      user = jwt.decode(token);
    }
    api.setAuthHeaderToken(token);

    api.listOffers().then((response) => {
      this.setState({
        list: response.data,
        // me,
        user: user,
      });
    });
  }

  async handleChatClick(postedById, item) {
    if (!this.state.user) {
      this.props.history.push("/login");
      return;
    }
    try {
      const users = [this.state.user.id, postedById];

      await api.getOrCreateConversation(users, item);
      // setCurrentConversation(conversation);

      this.props.history.push("/mailbox");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="page-offers container mx-auto px-10 flex flex-col">
        <br />
        <table className="table-auto">
          <tbody>
            <tr className="bg-gray-200 h-10">
              <td>
                <div className="text-2xl font-bold text-center">OFFERS</div>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div>
          {this.state.list.length > 0 ? (
            this.state.list.map((element) => {
              return (
                <React.Fragment key={element._id}>
                  <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-green-500 border-opacity-75 shadow overflow-hidden">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <p className="text-base font-bold tracking-wider">
                          {element.title}
                        </p>
                        <p>
                          Date:{" "}
                          {new Date(element.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        {/* <p>Item ID: {element._id}</p> */}
                        {/* <p>Type: {element.postType}</p> */}
                        <p className="truncate mr-2">
                          Description: {element.description}
                        </p>
                        <p>Category: {element.category}</p>
                        <p>
                          Tags: {element.tags}
                          <br />
                        </p>
                        <br />
                        {/* // Toggle Item Owner Display */}
                        {!this.state.user ||
                        this.state.user.id !== element.postedBy._id ? (
                          <p>
                            Posted By:{" "}
                            {`${element.postedBy.first_name} ${element.postedBy.last_name}`}
                          </p>
                        ) : (
                          <p className="item-owner">
                            Posted By: <b className="text-red-800">You</b>
                          </p>
                        )}
                        {/* <p>
                          Posted By:{" "}
                          {`${element.postedBy.first_name} ${element.postedBy.last_name}`}
                        </p> */}
                      </div>
                      <div className="col2">
                        <br />
                        <p>Status: {element.status}</p>
                        <p>Delivery: {element.delivery}</p>
                        <br />
                        <Link
                          to={{
                            pathname: `/items/${element._id}`,
                            state: {
                              showRequest: true,
                            },
                          }}
                          className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 hover:no-underline hover:text-gray-800"
                        >
                          View
                        </Link>
                        {/* // Toggle Chat Btn Display */}
                        {!this.state.user ||
                        this.state.user.id !== element.postedBy._id ? (
                          <button
                            type="submit"
                            onClick={() =>
                              this.handleChatClick(
                                element.postedBy._id,
                                element._id
                              )
                            }
                            className="inline-flex justify-center text-gray-800 font-semibold mx-3 px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none"
                          >
                            Chat
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
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

export default withCookies(withRouter(Offers));

import React from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";

// import css later
// import Item from "./Item";

import api from "../../services/api";

class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      me: {},
    };
  }

  componentDidMount() {
    console.log("mounting offers");
    const token = this.props.cookies.get("token");

    if (!token) {
      this.props.history.push("/login");
    }

    const me = jwt.decode(token);

    this.listOffers().then((response) => {
      //   console.log(response.data);
      this.setState({
        list: response.data,
        me,
      });
    });
  }

  listOffers() {
    return axios.get("http://localhost:5000/api/v1/offers");
  }

  async startConversation(users, item) {
    const response = await api.getConversationsByUsersAndItem(users, item);
    const conversations = response.data.conversations;
    let conversation;

    if (conversations.length === 0) {
      conversation = await api.createConversation(users, item);
      //   console.log(conversation);
    } else {
      conversation = conversations[0];
    }

    return conversation;
  }

  async handleChatClick(users, item) {
    try {
      const conversation = await this.startConversation(users, item);
      //   console.log(conversation);
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
                        <p>
                          {/* to change to first & last name */}
                          Posted By: {element.postedBy}
                        </p>
                      </div>
                      <div className="col2">
                        <br />
                        <p>Status: {element.status}</p>
                        <p>Delivery: {element.delivery}</p>
                        <br />
                        <button
                          type="submit"
                          className="inline-flex justify-center text-white font-semibold px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-300"
                        >
                          Request
                        </button>
                        {/* <span> </span> */}
                        <button
                          type="submit"
                          onClick={() =>
                            this.handleChatClick(
                              [this.state.me.id, element.postedBy],
                              element._id
                            )
                          }
                          className="inline-flex justify-center text-gray-800 font-semibold mx-3 px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400"
                        >
                          Chat
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400"
                        >
                          Edit
                        </button>
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

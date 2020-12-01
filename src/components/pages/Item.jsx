import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Donate from "./item/Donate";
import Request from "./item/Request";
// import css later

// temp seed data, to link to API later
const user = {
    _id: "5fb8b003e1e86a126a37520d",
    first_name: "Monica",
    last_name: "Bing",
    organisation: "Alexandro",
};

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            user: null, //to update later
            itemID: null,
            showDonate: this.props.showDonate || false, // not working, to check
            showRequest: this.props.showRequest || false,
            // showClick: true,
        };
        this.handleDonateClick = this.handleDonateClick.bind(this);
        this.handleRequestClick = this.handleRequestClick.bind(this);
    }

    componentDidMount() {
        const itemID = this.props.match.params.id;
        console.log(itemID);

        this.getItem(itemID).then((response) => {
            console.log(response.data);
            this.setState({
                item: response.data,
                user: user, //to update later
                itemID: itemID,
            });
        });
    }

    getItem(itemID) {
        return axios.get("http://localhost:5000/api/v1/items/" + itemID);
    }

    handleDonateClick() {
        this.setState({
            showDonate: !this.state.showDonate,
        });
    }

    handleRequestClick() {
        this.setState({
            showRequest: !this.state.showRequest,
        });
    }

    render() {
        return (
            <div className="page-item container mx-auto px-10 flex flex-col">
                {this.state.item ? (
                    <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-green-500 border-opacity-75 shadow overflow-hidden">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-2">
                                <p className="text-base font-bold tracking-wider">
                                    {this.state.item.title}
                                </p>
                                <p>
                                    Date:{" "}
                                    {new Date(
                                        this.state.item.createdAt
                                    ).toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p>Type: {this.state.item.postType}</p>
                                <br />
                                <p className="text-justify">
                                    Description: {this.state.item.description}
                                </p>
                                <p>Category: {this.state.item.category}</p>
                                <p>Tags: {this.state.item.tags}</p>
                                <br />
                                <p>Posted By: {this.state.item.postedBy}</p>
                                <p>Item ID: {this.state.item._id}</p>
                            </div>
                            <div className="col2">
                                <br />
                                <p>Status: {this.state.item.status}</p>
                                <p>Delivery: {this.state.item.delivery}</p>
                                <br />
                                {this.state.item.postType === "Request" ? (
                                    <button
                                        onClick={this.handleDonateClick}
                                        className="inline-flex justify-center text-white font-semibold px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-300"
                                    >
                                        Donate
                                    </button>
                                ) : (
                                    <button
                                        onClick={this.handleRequestClick}
                                        className="inline-flex justify-center text-white font-semibold px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-300"
                                    >
                                        Request
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="inline-flex justify-center text-gray-800 font-semibold mx-3 px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400"
                                >
                                    Chat
                                </button>
                                <Link
                                    to={{
                                        pathname: `/items/${this.state.itemID}/edit`,
                                    }}
                                    className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 hover:no-underline hover:text-gray-800"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <br />
                        {/* // Toggle Donate Btn */}
                        {this.state.showDonate ? (
                            <Donate user={this.state.user} />
                        ) : null}

                        {/* // Toggle Request Btn */}
                        {this.state.showRequest ? (
                            <Request user={this.state.user} />
                        ) : null}

                        {/* {this.state.showClick &&
                        this.state.item.postType === "Request" ? (
                            <Donate user={this.state.user} />
                        ) : (
                            <Request user={this.state.user} />
                        )} */}
                    </div>
                ) : (
                    <p>No such item found.</p>
                )}
            </div>
        );
    }
}

export default Item;

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import css later
// import Item from "./Item";

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        this.listOffers().then((response) => {
            console.log(response.data);
            this.setState({
                list: response.data,
            });
        });
    }

    listOffers() {
        return axios.get("http://localhost:5000/api/v1/offers");
    }

    render() {
        return (
            <div className="page-offers container mx-auto px-10 flex flex-col">
                <br />
                <table className="table-auto">
                    <tbody>
                        <tr className="bg-gray-200 h-10">
                            <td>
                                <div className="text-2xl font-bold text-center">
                                    OFFERS
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {/* To display images later */}
                <div>
                    {this.state.list.length > 0 ? (
                        this.state.list.map((element) => {
                            return (
                                <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-green-500 border-opacity-75 shadow overflow-hidden">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <p className="text-base font-bold tracking-wider">
                                                {element.title}
                                            </p>
                                            <p>
                                                Date:{" "}
                                                {new Date(
                                                    element.createdAt
                                                ).toLocaleDateString("en-GB", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            {/* <p>Item ID: {element._id}</p> */}
                                            {/* <p>Type: {element.postType}</p> */}
                                            <p className="truncate mr-2">
                                                Description:{" "}
                                                {element.description}
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
                                            <Link
                                                to={{
                                                    pathname: `/items/${element._id}`,
                                                    state: {
                                                        showRequest: true,
                                                    },
                                                }}
                                                className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 hover:no-underline hover:text-gray-800"
                                            >
                                                Request
                                            </Link>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center text-gray-800 font-semibold mx-3 px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400"
                                            >
                                                Chat
                                            </button>
                                            {/* Remove edit button, show in dashboard for owner of item only */}
                                            {/* <Link
                                                to={{
                                                    pathname: `/items/${element._id}/edit`,
                                                }}
                                                className="inline-flex justify-center text-gray-800 font-semibold px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 hover:no-underline hover:text-gray-800"
                                            >
                                                Edit
                                            </Link> */}
                                        </div>
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

export default Offers;

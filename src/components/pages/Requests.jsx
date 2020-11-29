import React from "react";
import axios from "axios";
// import css later
// import Item from "./Item";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        this.listRequests().then((response) => {
            console.log(response.data);
            this.setState({
                list: response.data,
            });
        });
    }

    listRequests() {
        return axios.get("http://localhost:5000/api/v1/requests");
    }

    render() {
        return (
            <div className="page-requests container mx-auto px-10 flex flex-col">
                <br />
                <table className="table-auto">
                    <tbody>
                        <tr className="bg-gray-200 h-10">
                            <td>
                                <div className="text-2xl font-bold text-center">
                                    REQUESTS
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />

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
                                                {/* try .populate in backend */}
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
                                                Donate
                                            </button>
                                            {/* <span> </span> */}
                                            <button
                                                type="submit"
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
                            );
                        })
                    ) : (
                        <p>No requests found.</p>
                    )}
                </div>
                <br />
            </div>
        );
    }
}

export default Requests;

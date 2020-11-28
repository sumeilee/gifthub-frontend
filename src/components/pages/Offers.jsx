import React from "react";
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
            <div className="page-offers">
                <h1>
                    <b>LIST OF OFFERS</b>
                </h1>

                {this.state.list.length > 0 ? (
                    this.state.list.map((element) => {
                        return (
                            <div>
                                <ul className="item-offer">
                                    <li>
                                        <b>Title: {element.title}</b>
                                    </li>
                                    <li>Item ID: {element._id}</li>
                                    <li>Type: {element.postType}</li>
                                    <li>Description: {element.description}</li>
                                    <li>Category: {element.category}</li>
                                    <li>Delivery: {element.delivery}</li>
                                    <li>Status: {element.status}</li>
                                    <li>Tags: {element.tags}</li>
                                    <li>postedBy: {element.postedBy}</li>
                                </ul>
                                <br />
                            </div>
                        );
                    })
                ) : (
                    <p>No offers found.</p>
                )}
            </div>
        );
    }
}

export default Offers;

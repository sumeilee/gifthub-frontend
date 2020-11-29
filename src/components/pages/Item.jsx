import React from "react";
import axios from "axios";
// import css later

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
        };
    }

    componentDidMount() {
        const itemID = this.props.match.params.id;
        console.log(itemID);

        this.getItem(itemID).then((response) => {
            console.log(response.data);
            this.setState({
                item: response.data,
            });
        });
    }

    getItem(itemID) {
        return axios.get("http://localhost:5000/api/v1/items/" + itemID);
    }

    render() {
        return (
            <div className="page-item">
                {this.state.item ? (
                    <div>
                        <ul className="item">
                            <li>
                                <b>Title: {this.state.item.title}</b>
                            </li>
                            <li>Item ID: {this.state.item._id}</li>
                            <li>Type: {this.state.item.postType}</li>
                            <li>Description: {this.state.item.description}</li>
                            <li>Category: {this.state.item.category}</li>
                            <li>Delivery: {this.state.item.delivery}</li>
                            <li>Status: {this.state.item.status}</li>
                            <li>Tags: {this.state.item.tags}</li>
                            <li>postedBy: {this.state.item.postedBy}</li>
                        </ul>
                        <br />
                    </div>
                ) : (
                    <p>No such item found.</p>
                )}
            </div>
        );
    }
}

export default Item;

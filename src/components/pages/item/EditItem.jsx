import React from "react";
import axios from "axios";
import qs from "qs";
import { withCookies } from "react-cookie";
import api from "../../../services/api";

// import css later

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      // user: null,
    };
  }

  //add form validation later

  componentDidMount() {
    const itemID = this.props.match.params.id;

    api.getItem(itemID).then((response) => {
      // console.log("getItem:" + response);
      this.setState({
        item: response.data,
        // user: user, //to update later
      });
    });
  }

  handleInputChange(e) {
    const { item } = this.state; //destructure
    item[e.target.name] = e.target.value;
    this.setState({ item });
  }

  // getItem(itemID) {
  //   return axios.get("http://localhost:5000/api/v1/items/" + itemID);
  // }

  //add form validation later

  handleFormSubmit(e) {
    e.preventDefault();
    axios.defaults.headers.common["auth_token"] = this.props.cookies.get(
      "token"
    );

    // // clear form messages
    const itemID = this.props.match.params.id;
    console.log(itemID);

    const formData = this.state.item;

    // axios
    //   .patch(
    //     "http://localhost:5000/api/v1/items/" + itemID,
    //     qs.stringify(formData)
    //   )
    //   .then((result) => {
    //     // console.log("new result" + result);
    //     console.log(formData);
    //     console.log("edit form submitted successfully");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // add form validation later
    const formValid = true; // update later

    if (formValid) {
      api
        .updateItem(itemID, formData)
        .then((response) => {
          console.log(response.data);
          console.log("edit form submitted successfully");
          // // clear form input
          // this.setState({
          //   postType: "",
          //   title: "",
          //   description: "",
          //   category: "",
          //   // images: "",
          //   tags: "",
          //   delivery: "",
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="page-item container mx-auto px-10 flex flex-col">
        {this.state.item ? (
          <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-yellow-300 border-opacity-75 shadow overflow-hidden">
            <p className="text-xl font-bold text-center">Edit Item Details</p>
            <br />
            <form
              onSubmit={(e) => {
                this.handleFormSubmit(e);
              }}
            >
              {/* <form> */}
              {/* //=== postType ==== // */}
              <div className="form-group">
                <label
                  htmlFor="postType"
                  className="text-base font-medium text-gray-700"
                >
                  Type:
                </label>{" "}
                <select
                  className="w-full text-base border-2 border-gray-300 rounded-md"
                  id="postType"
                  name="postType"
                  value={this.state.item.postType}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.postType}
                >
                  <option value="">-----</option>
                  <option value="Request">Request</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>
              {/* //=== Title ==== // */}
              <div className="mt-2">
                <label
                  htmlFor="title"
                  className="text-base font-medium text-gray-700"
                >
                  Title:
                </label>{" "}
                <input
                  type="text"
                  className="w-full text-base border-2 border-gray-300 rounded-md"
                  id="title"
                  name="title"
                  value={this.state.item.title}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.title}
                />
              </div>
              {/* //=== Description ==== // */}
              <div className="mt-2">
                <label
                  htmlFor="description"
                  className="inline-flex text-base font-medium text-gray-700"
                >
                  Description of Item:
                </label>{" "}
                <textarea
                  className="mt-1 inline-flex w-full text-base border-2 border-gray-300 rounded-md"
                  rows="3"
                  id="description"
                  name="description"
                  value={this.state.item.description}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.description}
                ></textarea>
              </div>
              {/* //=== Category ==== // */}
              <div className="mt-2">
                <label
                  htmlFor="category"
                  className="inline-flex text-base font-medium text-gray-700"
                >
                  Category:
                </label>
                <select
                  className="w-full text-base border-2 border-gray-300 rounded-md"
                  id="category"
                  name="category"
                  value={this.state.item.category}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.category}
                >
                  <option value="">-----</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Infant and Children">
                    Infant and Children
                  </option>
                  <option value="Medical Aids">Medical Aids</option>
                  <option value="Food">Food</option>
                </select>
              </div>
              {/* //=== Images ==== // */}
              {/* <div className="mt-2">
                <label htmlFor="images" className="inline-flex text-base font-medium text-gray-700">
                  Images:
                </label>{" "}
                <input
                  type="file"
                  className="form-control-file"
                  id="images"
                  name="images"
                  value={this.state.item.images}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }} //not working, to check
                  // placeholder={this.state.item.images}
                />
              </div> */}
              {/* //=== Delivery ==== // */}
              <div className="mt-2">
                <label
                  htmlFor="delivery"
                  className="text-base font-medium text-gray-700"
                >
                  Delivery:
                </label>{" "}
                <select
                  className="w-full text-base border-2 border-gray-300 rounded-md"
                  id="delivery"
                  name="delivery"
                  value={this.state.item.delivery}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.delivery}
                >
                  <option value="">-----</option>
                  <option value="Included">Included</option>
                  <option value="Not included">Not included</option>
                </select>
              </div>
              {/* //=== Status ==== // */}
              <div className="mt-2">
                <label
                  htmlFor="status"
                  className="text-base font-medium text-gray-700"
                >
                  Status:
                </label>{" "}
                <select
                  className="w-full text-base border-2 border-gray-300 rounded-md"
                  id="status"
                  name="status"
                  value={this.state.item.status}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.status}
                >
                  <option value="">-----</option>
                  <option value="Open">Open</option>
                  <option value="Pending">Pending</option>
                  <option value="Fulfilled">Fulfilled</option>
                </select>
              </div>
              {/* //=== Tags ==== // */}
              <div className="mt-2">
                <label
                  htmlFor="tags"
                  className="inline-flex text-base font-medium text-gray-700"
                >
                  Tags:
                </label>
                <input
                  type="text"
                  className="mt-1 inline-flex w-full text-base border-2 border-gray-300 rounded-md"
                  id="tags"
                  name="tags"
                  value={this.state.item.tags}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }}
                  // placeholder={this.state.item.tags}
                />
              </div>
              {/* //=== Checkbox 1 ==== // */}
              <div className="mt-4">
                <input
                  type="checkbox"
                  className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
                  id="check-item-condition"
                  name="check-item-condition"
                  defaultChecked
                />{" "}
                <label
                  htmlFor="check-item-condition"
                  className="text-base font-medium text-gray-700"
                >
                  Item to be donated is in good working condition.
                </label>
              </div>
              {/* //=== Checkbox 2 ==== // */}
              <div className="mt-2">
                <input
                  type="checkbox"
                  className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
                  id="check-tnc"
                  name="check-tnc"
                  defaultChecked
                />{" "}
                <label
                  htmlFor="check-tnc"
                  className="text-base font-medium text-gray-700"
                >
                  Yes, I agree to Gifthub's terms & conditions for donations.
                </label>
              </div>
              <br />
              <button
                // onClick={(e) => {
                //     this.handleFormSubmit(e);
                // }}
                type="submit"
                className="inline-flex justify-center text-white font-semibold h-10 w-24 py-2 px-4 rounded-md bg-yellow-600 hover:bg-yellow-300"
              >
                Submit
              </button>
            </form>
            <br />
          </div>
        ) : (
          <p>No such item found.</p>
        )}
      </div>
    );
  }
}

export default withCookies(EditItem);

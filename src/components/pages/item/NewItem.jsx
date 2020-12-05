import React from "react";
import axios from "axios";
import qs from "qs";
import { withCookies } from "react-cookie";
// import css later

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // item: null,
      // refactor later
      postType: "",
      title: "",
      description: "",
      category: "",
      images: "",
      tags: "",
      delivery: "",
      postedBy: "",
      // user: user, //update later
      // formData: [], //add later
      me: {},
    };
  }

  handleInputChange(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    // state.item[e.target.name] = e.target.value;
    this.setState(state);
  }

  //add form validation later

  handleFormSubmit(e) {
    e.preventDefault();

    axios.defaults.headers.common["auth_token"] = this.props.cookies.get(
      "token"
    );

    // // clear form messages
    // this.setState({
    //     formMsg: [],
    // });

    const formData = {
      postType: this.state.postType,
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      images: this.state.images,
      tags: this.state.tags,
      delivery: this.state.delivery,
      // postedBy: user._id, //store in backend
    };

    axios
      .post("http://localhost:5000/api/v1/items", qs.stringify(formData))
      .then((result) => {
        // console.log(result);
        console.log(formData);
        console.log("form submitted successfully");
      });

    //add form validation later
  }

  render() {
    return (
      <div className="page-donate container mx-auto px-10 flex flex-col">
        <br />
        <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-yellow-300 border-opacity-75 shadow overflow-hidden">
          <p className="text-xl font-bold text-center">Submit New Item</p>
          <br />
          <form
            onSubmit={(e) => {
              this.handleFormSubmit(e);
            }}
          >
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
                value={this.state.postType}
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
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
                value={this.state.title}
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
                placeholder=""
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
                id="description"
                name="description"
                rows="3"
                value={this.state.description}
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
                placeholder=""
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
                value={this.state.category}
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
              >
                <option value="">-----</option>
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Infant and Children">Infant and Children</option>
                <option value="Medical Aids">Medical Aids</option>
                <option value="Food">Food</option>
              </select>
            </div>
            {/* //=== Images ==== // */}
            {/* <div className="mt-2">
              <label
                htmlFor="images"
                className="inline-flex text-base font-medium text-gray-700"
              >
                Images:
              </label>{" "}
              <input
                type="file"
                className="form-control-file"
                id="images"
                name="images"
                value={this.state.images}
                onChange={(e) => {
                  this.handleInputChange(e);
                }} //check if works later
              />
            </div> */}
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
                value={this.state.tags}
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
                placeholder="tag1, tag2"
              />
            </div>
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
                value={this.state.delivery}
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
                placeholder=""
              >
                <option value="">-----</option>
                <option value="Included">Included</option>
                <option value="Not included">Not included</option>
              </select>
            </div>
            {/* //=== Checkbox 1 ==== // */}
            <div className="mt-4">
              <input
                type="checkbox"
                className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
                id="check-item-condition"
                name="check-item-condition"
              />{" "}
              <label
                for="check-item-condition"
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
              />{" "}
              <label
                for="check-tnc"
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
      </div>
    );
  }
}

export default withCookies(NewItem);

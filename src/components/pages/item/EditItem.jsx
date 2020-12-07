import React from "react";
import { withCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import api from "../../../services/api";
import FormMsg from "./FormMsg";

// import css later

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      user: null,
      isItemOwner: false,
      checkCondition: false,
      checkTnc: false,
      formMsg: [],
      showFormMsg: false,
    };
  }

  componentDidMount() {
    const itemID = this.props.match.params.id;

    // verify logged in user
    const auth_token = this.props.cookies.get("token");
    let currUser = null;
    if (auth_token) {
      currUser = jwt.decode(auth_token);
    }
    api.setAuthHeaderToken(auth_token);
    console.log(currUser.id);

    api.getItem(itemID).then((response) => {
      const itemOwner = response.data.postedBy._id;
      console.log(itemOwner);

      // verify if logged in user is authorized to edit post
      if (currUser.id !== itemOwner) {
        this.props.history.push("/user/dashboard");
        return;
      }

      this.setState({
        item: response.data,
        user: currUser,
        isItemOwner: true,
      });
    });
  }

  handleInputChange(e) {
    const { item } = this.state; //destructure
    item[e.target.name] = e.target.value;
    this.setState({ item });
  }

  handleCheckboxChange(e) {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // clear form messages
    this.setState({
      formMsg: [],
    });

    const itemID = this.props.match.params.id;
    // console.log(itemID);
    const formData = this.state.item;
    console.log(formData);

    const formValid = this.validateFormInputs();

    if (formValid) {
      api
        .updateItem(itemID, formData)
        .then((response) => {
          // if (!response.data) {
          //   console.log("error in form");
          // }
          console.log(response);
          console.log("edit item submitted successfully");
          this.setState({
            showFormMsg: true,
          });
          this.scrollToTop();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  validateFormInputs() {
    const errMsg = [];
    //pending check for special char
    //pending stringify submission values

    if (this.state.item.postType === "") {
      errMsg.push("Type is required");
    }
    if (this.state.item.title === "") {
      errMsg.push("Title is required");
    } else if (this.state.item.title.length > 200) {
      errMsg.push("Title must be 200 characters or less");
    }
    if (this.state.item.description === "") {
      errMsg.push("Description is required");
    }
    if (this.state.item.category === "") {
      errMsg.push("Category is required");
    }
    if (this.state.item.status === "") {
      errMsg.push("Status is required");
    }
    if (this.state.item.delivery === "") {
      errMsg.push("Delivery is required");
    }
    if (!this.state.checkCondition) {
      errMsg.push("Please confirm that the item is in good working condition.");
    }
    if (!this.state.checkTnc) {
      errMsg.push("Please accept the terms & conditions.");
    }

    if (errMsg.length === 0) {
      return true;
    }

    this.setState({
      formMsg: errMsg,
    });
    console.log(errMsg);
    return false;
  }

  scrollToTop = () => {
    this.pageTop.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <div
        className="page-item container mx-auto px-10 flex flex-col"
        ref={(elem) => {
          this.pageTop = elem;
        }}
      >
        {this.state.item ? (
          <div className="container-item border-2 px-4 py-8 mx-4 my-4 rounded-lg border-yellow-300 border-opacity-75 shadow overflow-hidden">
            {/* // Toggle Form Msg display */}
            {this.state.showFormMsg ? <FormMsg /> : null}

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
                  required
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
                  required
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
                  required
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
                  required
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
                <label
                  htmlFor="images"
                  className="inline-flex text-base font-medium text-gray-700"
                >
                  Images:
                </label>
                <br />
                <input
                  type="file"
                  className="form-control-file"
                  id="images"
                  name="images"
                  accept=".png, .jpg, .jpeg"
                  value={this.state.item.images}
                  onChange={(e) => {
                    this.handleInputChange(e);
                  }} //not working, to check
                  multiple //note to set limit on num of images
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
                  required
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
                  required
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
                  name="checkCondition"
                  onChange={(e) => {
                    this.handleCheckboxChange(e);
                  }}
                  required
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
                  name="checkTnc"
                  onChange={(e) => {
                    this.handleCheckboxChange(e);
                  }}
                  required
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

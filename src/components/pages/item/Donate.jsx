import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import api from "../../../services/api";
// import css later

class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      dateAvailable: null,
      description: "",
      images: "",
      checkCondition: false,
      checkDelivery: false,
      checkTnc: false,
      errMsg: "",
    };
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit() {
    let errMsg = "";

    if (!this.state.checkCondition) {
      errMsg += "Please confirm that the item is in good working condition. ";
    }

    if (!this.state.checkDelivery) {
      errMsg += "Only items that include delivery can be accepted. ";
    }

    if (!this.state.checkTnc) {
      errMsg += "Please accept the terms & conditions.";
    }

    if (errMsg) {
      console.log(errMsg);
      this.setState({
        errMsg,
      });
    } else {
      let message = "I would like to donate this item.";

      if (this.state.description) {
        message += `\n\n${this.state.description}`;
      }

      if (this.state.dateAvailable) {
        message += `\n\nIt will be available on ${moment(
          this.state.dateAvailable
        ).format("MMM DD, YYYY")}`;
      }

      const { item, user } = this.props;
      const users = [item.postedBy._id, user.id];

      try {
        const conversation = await api.getOrCreateConversation(users, item._id);

        await api.createMessage(
          user.id,
          item.postedBy._id,
          message,
          "",
          conversation._id
        );
        this.props.history.push("/mailbox");
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  render() {
    return (
      <div className="page-donate container mx-auto px-10 flex flex-col">
        <br />
        <p className="text-xl font-bold text-center text-green-600">
          Yes, I wish to donate! :)
        </p>

        {/* //=== Delivery Date ==== // */}
        <div className="mt-2">
          <label htmlFor="name" className="text-base font-medium text-gray-700">
            Delivery Date:
          </label>{" "}
          <input
            type="date"
            id="delivery-date"
            name="dateAvailable"
            onChange={(e) => this.handleInputChange(e)}
            className="w-40 text-base border-2 border-gray-300 rounded-md"
            min={moment().format("YYYY-MM-DD")}
          />
        </div>
        {/* //=== Images ==== // */}
        <div className="mt-2">
          <label
            htmlFor="images"
            className="text-base font-medium text-gray-700"
          >
            Please upload a photo of item to be donated for verification.
          </label>

          <input
            type="file"
            className="form-control-file"
            onChange={(e) => this.handleInputChange(e)}
            id="images"
            name="images"
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
            onChange={(e) => this.handleInputChange(e)}
            id="description"
            name="description"
            rows="3"
            placeholder=""
          ></textarea>
        </div>
        {/* //=== Checkbox 1 ==== // */}
        <div className="mt-4">
          <input
            type="checkbox"
            onChange={(e) => this.handleInputChange(e)}
            className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
            id="check-item-condition"
            name="checkCondition"
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
            onChange={(e) => this.handleInputChange(e)}
            className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
            id="check-delivery"
            name="checkDelivery"
          />{" "}
          <label
            htmlFor="check-delivery"
            className="text-base font-medium text-gray-700"
          >
            Delivery of item will be included.
          </label>
        </div>
        {/* //=== Checkbox 3 ==== // */}
        <div className="mt-2">
          <input
            type="checkbox"
            onChange={(e) => this.handleInputChange(e)}
            className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
            id="check-tnc"
            name="checkTnc"
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
          type="submit"
          onClick={() => this.handleSubmit()}
          className="inline-flex justify-center text-white font-semibold h-10 w-24 py-2 px-4 rounded-md bg-yellow-600 hover:bg-yellow-300"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withRouter(Donate);

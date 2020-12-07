import React from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import moment from "moment";
import api from "../../../services/api";
import ErrorMsg from "../../ErrorMsg";
// import css later

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      dateNeeded: null,
      reason: "",
      images: "",
      checkCondition: false,
      checkDelivery: false,
      checkTnc: false,
      errMsg: "",
      formErr: "",
    };
  }

  componentDidMount() {
    api.setAuthHeaderToken(this.props.cookies.get("token"));
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit() {
    let errMsg = "";

    if (!this.state.dateNeeded) {
      errMsg += "Date needed is required.";
    }
    if (this.state.reason === "") {
      errMsg += "Reason is required. ";
    }
    if (!this.state.checkTnc) {
      errMsg += "Please accept the terms & conditions.";
    }

    if (errMsg) {
      console.log(errMsg);
      this.setState({
        errMsg,
        formErr: "Error in form, please check values",
      });
    } else {
      let message = "I would like to request this item.";

      if (this.state.reason) {
        message += `\n\n${this.state.reason}`;
      }

      if (this.state.dateNeeded) {
        message += `\n\nIt is needed by ${moment(this.state.dateNeeded).format(
          "MMM DD, YYYY"
        )}`;
      }

      const { item, user } = this.props;

      if (!user) {
        this.props.history.push("/login");
        return;
      }

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
        <hr />
        <br />
        <p className="text-xl font-bold text-center text-green-600">
          Yes, I would like to request for the item!
        </p>
        <br />
        <p className="text-base font-medium text-gray-700">
          Name: {this.props.user.first_name} {this.props.user.last_name}
        </p>
        {/* //=== Delivery Date ==== // */}
        <div className="mt-2">
          <label
            htmlFor="needed-date"
            className="text-base font-medium text-gray-700"
          >
            Date Needed by:
          </label>{" "}
          <input
            type="date"
            id="needed-date"
            name="dateNeeded"
            onChange={(e) => this.handleInputChange(e)}
            className="w-40 text-base border-2 border-gray-300 rounded-md"
            min={moment().format("YYYY-MM-DD")}
          />
        </div>
        {/* //=== Reason ==== // */}
        <div className="mt-2">
          <label
            htmlFor="reason"
            className="inline-flex text-base font-medium text-gray-700"
          >
            Reason for Request:
          </label>{" "}
          <textarea
            className="mt-1 py-2 px-3 inline-flex w-full text-base border-2 border-gray-300 rounded-md focus:outline-none"
            id="reason"
            name="reason"
            onChange={(e) => this.handleInputChange(e)}
            rows="3"
            placeholder=""
          ></textarea>
        </div>

        {/* //=== Checkbox 1 ==== // */}
        <div className="mt-2">
          <input
            type="checkbox"
            className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
            id="check-tnc"
            name="checkTnc"
            onChange={(e) => this.handleInputChange(e)}
          />{" "}
          <label
            htmlFor="check-tnc"
            className="text-base font-medium text-gray-700"
          >
            Yes, I agree to Gifthub's terms & conditions for requests.
          </label>
        </div>
        <br />
        {this.state.errMsg !== "" ? <ErrorMsg msg={this.state.formErr} /> : ""}
        <button
          type="submit"
          onClick={() => this.handleSubmit()}
          className="inline-flex justify-center text-white font-semibold h-10 w-24 py-2 px-4 rounded-md bg-yellow-600 hover:bg-yellow-300 focus:outline-none"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withCookies(withRouter(Request));

import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import {withCookies} from "react-cookie";

class GuestRoute extends React.Component {
  // isAuthenticated will check if user is logged in or not
  isAuthenticated() {
    const token = this.props.cookies.get("token");

    // checks if token evaluates to false
    // - token === undefined
    // - token === null
    // - token === ""
    if (!token) {
      return false;
    }

    return true;
  }

  render() {
    const Comp = this.props.component;

    return this.isAuthenticated() ? <Redirect to="/users/dashboard" /> : <Comp />;
  }
}

export default withCookies(withRouter(GuestRoute));

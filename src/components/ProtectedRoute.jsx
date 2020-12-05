import React from "react";
import {withRouter, Redirect, Route} from "react-router-dom";
import {withCookies} from "react-cookie";

class ProtectedRoute extends React.Component {
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

    return this.isAuthenticated() ? (
      <Route {...this.props} component={Comp} />
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default withCookies(withRouter(ProtectedRoute));

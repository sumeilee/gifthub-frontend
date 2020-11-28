import React from "react";
import axios from "axios";
import {withCookies} from "react-cookie";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {first_name: ""},
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/users/me", {
        headers: {
          auth_token: this.props.cookies.get("token"),
        },
      })
      .then((res) => {
        this.setState({
          user: res.data,
        });
      });
  }

  render() {
    return (
      <div className="page-dashboard">
        <p>Welcome, {this.state.user.first_name} </p>
      </div>
    );
  }
}

export default withCookies(Dashboard);

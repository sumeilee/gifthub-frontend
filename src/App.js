import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { io } from "socket.io-client";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Mailbox from "./components/pages/Mailbox";

//User Components
import Login from "./components/pages/Login";

import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import EditProfile from "./components/pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

import Offers from "./components/pages/Offers";
import Requests from "./components/pages/Requests";
import Item from "./components/pages/Item";
import NewItem from "./components/pages/item/NewItem";
import EditItem from "./components/pages/item/EditItem";

import SocketContext from "./contexts/SocketContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
    };
  }

  componentDidMount() {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => this.setSocket(socket));
  }

  setSocket(socket) {
    this.setState({
      socket: socket,
    });
  }

  render() {
    if (this.state.socket) {
      console.log(this.state.socket.id);
    }
    return (
      <div className="flex flex-col justify-between h-full">
        <SocketContext.Provider value={{ socket: this.state.socket }}>
          <Router>
            <Header />
            <Switch>
              {/* Item Routes */}
              <Route path="/offers" component={Offers} />
              <Route path="/requests" component={Requests} />
              <Route path="/items/new" component={NewItem} />
              <Route path="/items/:id/edit" component={EditItem} />
              <Route path="/items/:id" component={Item} />
              <Route path="/mailbox" component={Mailbox} />

              {/* User Routes */}
              <GuestRoute path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoute
                path="/user/editprofile"
                component={EditProfile}
              />
              <ProtectedRoute path="/user/dashboard" component={Dashboard} />
              <Route path="/" />
            </Switch>
            <Footer />
          </Router>
        </SocketContext.Provider>
      </div>
    );
  }
}

export default App;

import React, { useEffect, useState, useContext } from "react";
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

import AuthContext from "./contexts/AuthContext";
import SocketContext from "./contexts/SocketContext";

const App = () => {
  const [currentSocket, setCurrentSocket] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      const socket = io("http://localhost:5000", {
        reconnection: false,
      });
      if (socket) {
        socket.on("connect", () => {
          console.log(`new connection ${socket.id}`);
          if (user) {
            socket.emit("login", user.id);
          }
          setCurrentSocket(socket);
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-between h-full">
      <SocketContext.Provider value={{ currentSocket, setCurrentSocket }}>
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
            <ProtectedRoute path="/user/editprofile" component={EditProfile} />
            <ProtectedRoute path="/user/dashboard" component={Dashboard} />
            <Route path="/" />
          </Switch>
          <Footer />
        </Router>
      </SocketContext.Provider>
    </div>
  );
};

export default App;

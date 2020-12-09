import React, {useEffect, useState, useContext} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {io} from "socket.io-client";

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
import Home from "./components/pages/Home";

import AuthContext from "./contexts/AuthContext";
import SocketContext from "./contexts/SocketContext";

let socket;
const socketHost =
  process.env.NODE_ENV === "production"
    ? "https://gifthubsg-backend.herokuapp.com"
    : "http://localhost:5000";

try {
  socket = io(socketHost, {
    reconnection: false,
  });
} catch (err) {
  console.log(err.message);
}

const App = () => {
  const [currentSocket, setCurrentSocket] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        //console.log(`new connection ${socket.id}`);
        if (user) {
          socket.emit("login", user.id);
        }
        setCurrentSocket(socket);
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-between h-full">
      <SocketContext.Provider value={{currentSocket, setCurrentSocket}}>
        <Router>
          <Header />
          <Switch>
            {/* Item Routes */}
            <Route path="/offers" component={Offers} />
            <Route path="/requests" component={Requests} />
            <ProtectedRoute path="/items/new" component={NewItem} />
            <ProtectedRoute path="/items/:id/edit" component={EditItem} />
            <Route path="/items/:id" component={Item} />
            <ProtectedRoute path="/mailbox" component={Mailbox} />

            {/* User Routes */}
            <ProtectedRoute path="/user/editprofile" component={EditProfile} />
            <ProtectedRoute path="/user/dashboard" component={Dashboard} />
            <GuestRoute path="/login" component={Login} />
            <Route path="/register" component={Register} />

            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </SocketContext.Provider>
    </div>
  );
};

export default App;

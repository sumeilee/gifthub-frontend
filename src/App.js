import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";

import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import EditProfile from "./components/pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Router>
        <Header />
        <Switch>
          <GuestRoute path="/login" component={Login} />
          <Route path="/offers" />
          <Route path="/requests" />
          <Route path="/register" component={Register} />

          <ProtectedRoute path="/user/dashboard" component={Dashboard} />
          <ProtectedRoute path="/user/editprofile" component={EditProfile} />
          <Route path="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

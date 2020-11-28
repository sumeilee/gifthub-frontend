import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Router>
        <Header />
        <Switch>
          <Route path="/offers" />
          <Route path="/requests" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user/dashboard" component={Dashboard} />

          <Route path="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

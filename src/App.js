import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Offers from "./components/pages/Offers";
import Requests from "./components/pages/Requests";
import Item from "./components/pages/Item";

class App extends React.Component {
    render() {
        return (
            <div className="flex flex-col justify-between h-full">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/offers" component={Offers} />
                        <Route path="/requests" component={Requests} />
                        <Route path="/items/:id" component={Item} />
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
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Offers from "./components/pages/Offers";
import Requests from "./components/pages/Requests";
import Item from "./components/pages/Item";
import NewItem from "./components/pages/item/NewItem";

class App extends React.Component {
    render() {
        return (
            <div className="flex flex-col justify-between h-full">
                <Router>
                    <Header />
                    <Switch>
                        {/* Amend */}
                        <Route path="/offers" component={Offers} />
                        <Route path="/requests" component={Requests} />
                        <Route path="/items/:id" component={Item} />
                        {/* <Route path="/newitem" component={NewItem} /> */}
                        <Route path="/signin" />
                        <Route path="/signup" />
                        <Route path="/" />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;

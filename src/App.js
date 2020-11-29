import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

//User Components
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Offers from "./components/pages/Offers";
import Requests from "./components/pages/Requests";
import Item from "./components/pages/Item";

//Item Components
import Offers from "./components/pages/Offers";
import Requests from "./components/pages/Requests";
import Item from "./components/pages/Item";
import NewItem from "./components/pages/item/NewItem";
import EditItem from "./components/pages/item/EditItem";

class App extends React.Component {
    render() {
        return (
            <div className="flex flex-col justify-between h-full">
                <Router>
                    <Header />
                    <Switch>
                        {/* Item Routes */}
                        <Route path="/offers" component={Offers} />
                        <Route path="/requests" component={Requests} />
                        <Route path="/items/new" component={NewItem} />
                        <Route path="/items/:id/edit" component={EditItem} />
                        <Route path="/items/:id" component={Item} />

                        {/* User Routes */}
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

import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./components/home/Main";
import MainAppBar from "./components/navbar/MainAppBar";
import Login from "./components/auth/Login";
import Dashboard from "./components/admin/Dashboard";
import AddUser from "./components/admin/AddUser";
import Profile from "./components/user/Profile";
import AddProduct from "./components/home/AddProduct";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <MainAppBar/>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/adduser" component={ AddUser } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/addproduct" component={ AddProduct } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

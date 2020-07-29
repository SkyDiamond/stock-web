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
import ProductDetail from "./components/home/ProductDetail";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <MainAppBar/>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route path="/login" component={ Login } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/adduser" component={ AddUser } />
          <Route path="/profile" component={ Profile } />
          <Route path="/addproduct" component={ AddProduct } />
          <Route path="/product/:id" component={ProductDetail} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

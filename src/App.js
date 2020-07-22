import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./components/home/Main";
import MainAppBar from "./components/navbar/MainAppBar";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <MainAppBar/>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route exact path="/login" component={ Login } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

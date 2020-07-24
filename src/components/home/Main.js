import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { Redirect } from "react-router-dom";

function Main() {
  if (!localStorage.usertoken) return <Redirect to="/login" />;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Home
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Main;

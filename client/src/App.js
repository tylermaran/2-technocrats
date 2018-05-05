import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ProfilePage} />
          <Route exact path="/register" compontent={Register} />
          <Route exact path="/login" compontent={Login} />
        </div>
      </Router>
    );
  }
}

export default App;

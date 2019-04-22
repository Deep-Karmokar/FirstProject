import React, { Component } from "react";
import Register from "./../Register/Register";
import { Login } from "./../Login/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Events from "../Events/Events";
import { Posts } from "./../Posts/Posts";
import firebase from "../../config/fire";
import { CreateEventPage } from "./../CreateEvents/CreateEventPage";
import { AddPosts } from "./../AddPosts/AddPosts";
import auth from "../../services/auth/auth";
import { ContactUs } from "./../Profile/ContactUs";
import { Confirm } from "./../Confirm/Confirm";
import TermsAndConditions from "./../TermsAndConditions/TermsAndConditions";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/createEventPage" component={CreateEventPage} />
          <Route exact path="/addPosts" component={AddPosts} />
          <Route exact path="/confirmBooking/:eventId" component={Confirm} />
          <Route
            exact
            path="/termsAndConditions"
            component={TermsAndConditions}
          />
        </div>
      </Router>
    );
  }
}

export default App;

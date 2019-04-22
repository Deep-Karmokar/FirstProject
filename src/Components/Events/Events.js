import React, { Component } from "react";
import AppNavBar from "../Appbar/AppNavBar";
import CreateEventFabButton from "./../CreateEvents/CreateEventFabButton";
import EventDetails from "./EventDetails";

export class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppNavBar />
        <h1> See All The Events Happening Around You! </h1>
        <EventDetails />
        <CreateEventFabButton />
      </div>
    );
  }
}

export default Events;

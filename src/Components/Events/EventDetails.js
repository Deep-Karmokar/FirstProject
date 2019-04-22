import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.events = [];
    this.state.events = [];
    this.getEvents();
  }

  state = {
    events: []
  };

  events = [];

  // toggle = i => {
  //   console.log(i);
  //   this.state.events[i].toggle = !this.state.events[i].toggle;
  // };

  getEvents = () => {
    firebase
      .database()
      .ref("events")
      .once("value", snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(event => {
          if (event.val()) {
            this.state.events.push(event.val());
            console.log(this.state.events);
            this.state.events[this.state.events.length - 1].toggle = false;
            this.state.events[this.state.events.length - 1].key = event.key;
            this.state.events = this.state.events.reverse();
            this.render();
          }
        });
      });
  };

  showEvents() {
    this.events = [];
    this.state.events.forEach((event, i) => {
      this.events.push(
        <div className="wrapper-posts-page" key={i}>
          <div className="card">
            <img className="imageFit" src={event.imageUrl} />
            <h1 className="eventNameTag">
              <b> {event.eventName} </b>
            </h1>
            <div className="eventText">
              <div className="displayBlock">
                <p>
                  <b> Description: </b> {event.eventDescription}
                </p>
                <p>
                  <b> Location: </b> {event.eventLocation}
                </p>
                <p>
                  <b> City: </b> {event.eventCity}
                </p>
                <p>
                  <b> State: </b> {event.eventState}
                </p>
                <p>
                  <b> Date: </b> {new Date(event.dateTime).toDateString()}
                </p>
                <p>
                  <b> Pincode: </b> {event.pincode}
                </p>
                <p>
                  <b> Ticket Price: </b> {event.ticketPrice}
                </p>
                <Link to={`/confirmBooking/${event.key}`}>
                  <div className="bookButton">
                    <button> Book For This Event </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return this.events;
  }

  render() {
    return <div>{this.showEvents()}</div>;
  }
}

export default EventDetails;

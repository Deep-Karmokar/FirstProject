import React, { Component } from "react";
import ImageUpload from "./../Upload Image/ImageUpload";
import events from "./../../services/events/events";
import * as firebase from "firebase";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export class CreateEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: null,
      eventDescription: null,
      eventLocation: null,
      eventState: null,
      eventCity: null,
      dateTime: null,
      pincode: null,
      ticketPrice: null,
      formErrors: {
        eventName: "",
        eventDescription: "",
        eventLocation: "",
        eventState: "",
        eventCity: "",
        dateTime: "",
        pincode: "",
        ticketPrice: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      delete this.state.formErrors;
      let imagePushKey = firebase
        .database()
        .ref()
        .push().key;
      let uploadTask = firebase
        .storage()
        .ref(`eventImages/${imagePushKey}`)
        .putString(this.state.imagePath.result, "data_url", {
          contentType: "image/jpg"
        });
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.state.imageUrl = downloadURL;
            events
              .createEvent(this.state)
              .then(() => {
                console.log("Successfully created event");
                this.props.history.replace("/events");
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      );
    } else {
      console.error("FORM INVALID");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "eventName":
        formErrors.eventName =
          value.length < 3 ? "minimum 3 characters are required" : "";
        break;
      case "eventDescription":
        formErrors.eventDescription =
          value.length < 30 && value != null
            ? "Description must be 30 characters long"
            : "";
        break;
      case "eventLocation":
        formErrors.eventLocation =
          value.length < 30 && value != null
            ? "minimum 30 characters are required"
            : "";
        break;
      case "eventState":
        formErrors.eventState = value.length < 3 ? "Enter a proper state" : "";
        break;
      case "eventCity":
        formErrors.eventCity =
          value.length < 3 ? "minimum 3 characters are required" : "";
        break;
      case "dateTime":
        formErrors.dateTime =
          value.length < 6 ? "Enter Date in proper format" : "";
        break;
      case "pincode":
        formErrors.pincode =
          value.length < 6 ? "pincode must be atleast 4 characters long" : "";
        break;
      case "ticketPrice":
        formErrors.ticketPrice =
          value.length < 2 ? "Please enter ticket price" : "";
        break;
      case "image":
        formErrors.image =
          value != null ? "provide an banner for your event" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div classname="eventBody">
        <div className="createEventWrapper">
          <h1>Create Your Own Event Here!</h1>

          <div className="form-wrapper">
            <h1>Create Event</h1>
            <br />

            <form onSubmit={this.handleSubmit} noValidate>
              <div className="email">
                <label>Enter Event Name (Title)</label>
                <input
                  type="text"
                  placeholder="Enter Event Name"
                  name="eventName"
                  value={this.state.eventName}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.eventName.length > 0 && (
                  <span className="errorMessage">{formErrors.eventName}</span>
                )}
              </div>

              <div className="email">
                <label>Description of Event</label>
                <textarea
                  type="text"
                  cols="40"
                  rows="3"
                  placeholder="Event Description"
                  name="eventDescription"
                  value={this.state.eventDescription}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.eventDescription.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.eventDescription}
                  </span>
                )}
              </div>

              <div className="email">
                <label>Location (Full Address)</label>
                <textarea
                  type="text"
                  cols="40"
                  rows="3"
                  placeholder="Enter Event's Location"
                  name="eventLocation"
                  value={this.state.eventLocation}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.eventLocation.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.eventLocation}
                  </span>
                )}
              </div>

              <div className="firstName">
                <label> State</label>
                <input
                  type="text"
                  placeholder="State"
                  name="eventState"
                  value={this.state.eventState}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.eventState.length > 0 && (
                  <span className="errorMessage">{formErrors.eventState}</span>
                )}
              </div>

              <div className="lastName">
                <label> City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="eventCity"
                  value={this.state.eventCity}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.eventCity.length > 0 && (
                  <span className="errorMessage">{formErrors.eventCity}</span>
                )}
              </div>

              <div className="firstName">
                <label>Enter Pincode</label>
                <input
                  type="number"
                  name="pincode"
                  value={this.state.pincode}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.pincode.length > 0 && (
                  <span className="errorMessage">{formErrors.pincode}</span>
                )}
              </div>

              <div className="lastName">
                <label>Enter Date and Time</label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={this.state.dateTime}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.dateTime.length > 0 && (
                  <span className="errorMessage">{formErrors.dateTime}</span>
                )}
              </div>

              <div className="email">
                <label>Enter Ticket Price</label>
                <input
                  type="number"
                  placeholder="Ticket Price"
                  name="ticketPrice"
                  value={this.state.ticketPrice}
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.ticketPrice.length > 0 && (
                  <span className="errorMessage">{formErrors.ticketPrice}</span>
                )}
              </div>

              <ImageUpload
                imageChanged={imagePath => (this.state.imagePath = imagePath)}
              />

              <div className="createAccount">
                <button type="submit" onClick={this.handleSubmit}>
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEventPage;

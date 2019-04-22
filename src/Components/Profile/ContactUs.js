import React, { Component } from "react";
import AppNavBar from "../Appbar/AppNavBar";
import TextField from "@material-ui/core/TextField";
import * as firebase from "firebase";
import Snackbar from "@material-ui/core/Snackbar";

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      description: "",
      snackBar: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .database()
      .ref(`userQueries/${firebase.auth().currentUser.uid}`)
      .push(this.state)
      .then(() => {
        this.setState({
          snackBar: true,
          subject: "",
          description: ""
        });
      })
      .catch(error => {
        alert("Something went wrong.");
      });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleClose = () => {
    this.setState({
      snackBar: false
    });
  };

  render() {
    return (
      <div>
        <AppNavBar />
        <div className="eventBody">
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={this.state.snackBar}
            autoHideDuration={3000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <span id="message-id"> Your query is successfully posted! </span>
            }
          />{" "}
          <div className="wrapper-posts">
            <div className="form-wrapper-contactus">
              <h1>
                {" "}
                <b> Skillz - Forever </b>{" "}
              </h1>{" "}
              <br />
              <div className="contactUsFont">
                This is our new Web Application where we promote Hip - Hop
                Events.The main aim is to keep all the artists updated about all
                the events and encourage them to participate more.All the
                artists have so much potential but they lack a platform to get
                exposure.We are building a bridge to fill that gap, between
                artists and events. <br />
              </div>{" "}
              <div className="contactUsFontFlex">
                <div> Contact Us: skillz.forever @gmail.com </div>{" "}
                <div> Phone No. + 91 - 7506179505 </div>{" "}
              </div>{" "}
              <h2> Write us your query </h2> <br />
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="email">
                  <TextField
                    label="Enter Subject"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                </div>{" "}
                <div className="email">
                  <TextField
                    label="Description"
                    value={this.state.description}
                    multiline={true}
                    name="description"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    placeholder="Write your description here"
                  />
                </div>{" "}
                <div className="sendButton">
                  <button type="submit" onClick={this.handleSubmit}>
                    {" "}
                    Send{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default ContactUs;

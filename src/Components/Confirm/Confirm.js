import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";

export class Confirm extends Component {
  state = {
    checked: false
  };

  handleYes = e => {
    e.preventDefault();

    firebase
      .database()
      .ref(`userSubscriptionInEvents/${this.props.match.params.eventId}`)
      .update({ [firebase.app().auth().currentUser.uid]: true })
      .then(() => {
        this.props.history.push("/events");
        alert("Successfully registered in Event");
      });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div className="eventBody">
        <div className="wrapper-posts">
          <div className="form-wrapper-confirm">
            <h1>Confirm Your Booking?</h1>
            <h2>(Pay ticket price on spot)</h2>

            <div>
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleChange("checked")}
                value="checked"
              />
              I agree to the{" "}
              <Link to="/termsAndConditions">
                <u>Terms&Conditions</u>
              </Link>
              <div className="confirmButtonLineUp">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!this.state.checked}
                  onClick={this.handleYes}
                  style={{ margin: 5 }}
                >
                  Yes
                </Button>

                <Button
                  component={Link}
                  to="/events"
                  variant="contained"
                  color="secondary"
                  style={{ margin: 5 }}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Confirm;

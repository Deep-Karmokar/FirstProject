import React, { Component } from "react";
import ImageUpload from "../Upload Image/ImageUpload";
import * as firebase from "firebase";
import posts from "../../services/posts/posts";
import TextField from "@material-ui/core/TextField";

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

export class AddPosts extends Component {
  state = {
    postCaption: "",
    formErrors: {
      postCaption: ""
    }
  };
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    if (formValid(this.state)) {
      delete this.state.formErrors;
      let imagePushKey = firebase
        .database()
        .ref()
        .push().key;
      let uploadpost = firebase
        .storage()
        .ref(`postImages/${imagePushKey}`)
        .putString(this.state.imagePath.result, "data_url", {
          contentType: "image/jpg"
        });
      uploadpost.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          uploadpost.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.state.imageUrl = downloadURL;
            posts
              .uploadPostImage(this.state)
              .then(() => {
                console.log("Added a new post");
                this.props.history.replace("posts");
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
        formErrors.postCaption =
          value.length < 0 ? "Enter a suitable caption" : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [name]: value
    });
  };

  handleClose() {
    this.setState({
      snackBar: false
    });
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="eventBody">
        <div className="wrapper-posts">
          <div className="form-wrapper-addposts">
            <h1> Add New Post </h1> <br />
            <ImageUpload
              imageChanged={imagePath => (this.state.imagePath = imagePath)}
            />
            <div className="email">
              <TextField
                label="Caption"
                multiline={true}
                name="postCaption"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                placeholder="Your caption goes here!"
              />
              {formErrors.postCaption.length > 0 && (
                <span className="errorMessage">{formErrors.postCaption}</span>
              )}
            </div>
            <div className="createAccount">
              <button onClick={this.handleSubmit}> Add Post </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPosts;

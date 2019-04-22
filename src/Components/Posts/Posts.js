import React, { Component } from "react";
import AppNavBar from "../Appbar/AppNavBar";
import AddPostsFabButton from "../AddPosts/AddPostsFabButton";
import * as firebase from "firebase";

export class Posts extends Component {
  state = {
    posts: []
  };
  posts;

  imageChanged(e) {
    e.preventDefault();
  }

  componentDidMount() {
    firebase
      .database()
      .ref("posts")
      .once("value", snapshot => {
        snapshot.forEach(post => {
          if (post.val()) {
            this.state.posts.push(post.val());
            this.state.posts[this.state.posts.length - 1].key = post.key;
            this.state.posts[this.state.posts.length - 1].liked = false;
            this.state.posts = this.state.posts.reverse();
            this.props.history.replace("/posts");
            this.render();
          }
        });
      });
  }

  showPosts() {
    this.posts = [];
    this.state.posts.forEach((post, i) => {
      this.posts.push(
        <div className="form-wrapper-posts" key={i}>
          <img className="imageFitPost" src={post.imageUrl} />
          <h5> {post.postCaption} </h5>
        </div>
      );
    });
    return this.posts;
  }

  render() {
    return (
      <div className="wrapper-posts-page">
        <AppNavBar />
        <div className="card-Post">
          <div className="gridLayout">
            <h1> See All Posts By Your Friends! </h1>
            {this.showPosts()};
          </div>
        </div>
        <AddPostsFabButton />
      </div>
    );
  }
}

export default Posts;

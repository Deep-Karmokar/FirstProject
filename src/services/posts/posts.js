import * as firebase from 'firebase';

class Posts {

  uploadPostImage(post) {
    return firebase.database().ref('posts').push(post);
  }
}

export default new Posts();
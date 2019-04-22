import * as firebase from 'firebase';

class Contact {
 
  constructor() {}

  uploadQueries(query){
    return firebase.database().ref('queries').push(query);
  }
}

export default new Contact();
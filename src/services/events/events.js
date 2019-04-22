import * as firebase from 'firebase';

class Event {
  
  constructor() {}

  createEvent(event) {
    return firebase.database().ref('events').push(event)
  }

  uploadImage(event){
    return firebase.storage().ref('events').push(event);
  }

  getEvents() {
    return firebase.database().ref('events').once();
  }
}

export default new Event();
import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyCghK4x1oBEB5BGj-KYynNeSkSytQOsF5E",
  authDomain: "college-project-c84b6.firebaseapp.com",
  databaseURL: "https://college-project-c84b6.firebaseio.com",
  projectId: "college-project-c84b6",
  storageBucket: "college-project-c84b6.appspot.com",
  messagingSenderId: "556325205181"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    console.log('initialized');
  }
}

export default new Firebase()

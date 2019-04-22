import * as firebase from "firebase";

class Auth {
    login(user) {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }

    logout() {
        return firebase.auth().signOut();
    }

    async register(user) {
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    addUser(user) {
        return firebase.database().ref(`users/${user.uid}`).set(user);
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }
}

export default new Auth();
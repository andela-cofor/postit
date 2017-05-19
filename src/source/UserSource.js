import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

var firebase = require("firebase/app");

let UserSource = {
  addUser: {
    remote(state){
        console.log('was called')
        console.log(state, 'form number s')
      return new Promise((resolve, reject) => {
        const number = state.number
        const userName = state.user.displayName
        const userPic = state.user.photoURL
        const userEmail = state.user.email
        const userId = state.user.uid
        const defualtChannel = 'Lagos All'

        firebase = require("firebase/app");
        firebase.database().ref('/users/' + userId + '/profileDetails').set({
          "number": number,
          "profilePic": userPic,
          "email": userEmail,
          "userId": userId,
          "username": userName
        });
        firebase.database().ref('/channelsList/' + userId).push({
          "name": 'Lagos All',
        });
        firebase.database().ref('/channels/' + userId).push({
          "name": 'Lagos All',
        });
        firebase.database().ref('/messages/' + '/Lagos All/').push({
          "message": 'Welcome...',
          "date": new Date().toUTCString(),
          "author": state.user.displayName,
          "userId": state.user.uid,
          "profilePic": state.user.photoURL
        });
        resolve();
      });
    },
    success: Actions.channelAddSuccess,
    error: Actions.channelAddError
  }
}

export default UserSource;
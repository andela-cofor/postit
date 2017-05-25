import { browserHistory } from 'react-router';
import Actions from '../actions/';

require('firebase/auth');
require('firebase/database');


let firebase = require('firebase/app');

const UserSource = {
  editUserDetails: {
    remote(state) {
      // return new Promise((resolve, reject) => {
        const number = state.userDetails.phoneNumber;
        const userName = state.userDetails.userName;
        const userEmail = state.user.email;
        const userId = state.user.uid;
        const userPic = state.user.photoURL

        firebase = require('firebase/app');
        firebase.database().ref('/users/' + userId + '/profileDetails').set({
          'number': number,
          'username': userName,
          'profilePic': userPic,
          'email': userEmail,
          'userId': userId,
        })
    }
  },

  addUser: {
    remote(state) {
      return new Promise((resolve, reject) => {
        const number = state.number;
        const userName = state.user.displayName;
        const userPic = state.user.photoURL;
        const userEmail = state.user.email;
        const userId = state.user.uid;
        const defualtChannel = 'Lagos All';

        firebase = require("firebase/app");
        firebase.database().ref('/users/' + userId + '/profileDetails').set({
          'number': number,
          'profilePic': userPic,
          'email': userEmail,
          'userId': userId,
          'username': userName
        });
        // firebase.database().ref('/friends/' + `/${userId}/`).push({
        //   'userId': state.user.uid,
        //   'username': userName,
        //   'email': userEmail,
        //   'number': number
        // });
        firebase.database().ref('/contacts/' + number).push({
          'email': userEmail,
          'userId': userId,
          'username': userName,
          'number': number,
        });

        firebase.database().ref('/channels/' + userId).push({
          'name': defualtChannel,
        });
        firebase.database().ref('/Lagos All/' + userId).set({
          'email': userEmail,
          'username': userName,
          'number': number,
        });
        firebase.database().ref('/messages' + '/Lagos All/').push({
          'message': `${userName} just joined this Group... Welcome Him`,
          'date': new Date().toUTCString(),
          'author': state.user.displayName,
          'userId': state.user.uid,
          'profilePic': state.user.photoURL
        });
        resolve();
      });
    },
    success: Actions.userAddSuccess,
    error: Actions.userAddError
  },
  addUser1: {
    remote(state) {
      localStorage.setItem('state', JSON.stringify(state.user));
      return new Promise((resolve, reject) => {
        const number = state.user.phoneNumber;
        const userName = state.user.displayName;
        const userEmail = state.user.email;
        const userId = state.user.uid;
        const profilePic = state.user.profilePic
        const defualtChannel = 'Lagos All';

        // firebase = require("firebase/app");
        firebase.database().ref('/users/' + userId + '/profileDetails').set({
          'number': number,
          'email': userEmail,
          'userId': userId,
          'username': userName,
          'password': state.user.password,
          'profilePic': profilePic
        });
        firebase.database().ref('/contacts/' + number).push({
          'email': userEmail,
          'userId': userId,
          'username': userName,
          'number': number,
        });
        firebase.database().ref('/Lagos All/' + userId).push({
          'email': userEmail,
          'username': userName,
          'number': number,
        });
        firebase.database().ref('/channels/' + userId).push({
          'name': defualtChannel,
        });
        firebase.database().ref('/messages/' + 'Lagos All/').push({
          'message': `${userName} just joined this Group... Welcome Him`,
          'date': new Date().toUTCString(),
          'author': userName,
          'userId': userId,
          'profilePic': profilePic
        });
        resolve();
      });
    },
    success: Actions.userAddSuccess,
    error: Actions.userAddError
  },
  homepage: {
    remote(state) {
      browserHistory.push('chat');
    }
  }
};

export default UserSource;

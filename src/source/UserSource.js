import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");
import { browserHistory } from 'react-router';

var firebase = require("firebase/app");

let UserSource = {
  editUserDetails: {
    remote(state){
      console.log('Profile State', state);
      return new Promise((resolve, reject) => {
        const number = state.userDetails.phoneNumber
        const userName = state.userDetails.userName
        const userEmail = state.userDetails.email
        const userId = state.user.uid

        firebase = require("firebase/app");
        firebase.database().ref('/users/' + userId + '/profileDetails').set({
          "number": number,
          "email": userEmail,
          "userId": userId,
          "username": userName
        });
      })
    }
  },

  addUser: {
    remote(state){
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
        firebase.database().ref('/channelsList/').set({
          "name": 'Lagos All',
        });
        firebase.database().ref('/channels/' + userId).push({
          "name": 'Lagos All',
        });
        firebase.database().ref('/messages/' + '/Lagos All/').push({
          "message": `${userName} just joined this Group... Welcome Him`,
          "date": new Date().toUTCString(),
          "author": state.user.displayName,
          "userId": state.user.uid,
          "profilePic": state.user.photoURL
        });
        resolve();
      });
    },
    success: Actions.userAddSuccess,
    error: Actions.userAddError
  },
  addUser1: {
    remote(state){
      console.log('Adding ', state.user)
      return new Promise((resolve, reject) => {
        const number = state.user.phoneNumber
        const userName = state.user.displayName
        const userPic = state.user.photoURL
        const userEmail = state.user.email
        const userId = state.user.uid
        const defualtChannel = 'Lagos All'
        console.log(userId)

        firebase = require("firebase/app");
        firebase.database().ref('/users/' + userId + '/profileDetails').set({
          "number": number,
          "email": userEmail,
          "userId": userId,
          "username": userName,
          "password": state.user.password
        });
        firebase.database().ref('/channelsList/').set({
          "name": 'Lagos All',
        });
        firebase.database().ref('/channels/' + userId).push({
          "name": 'Lagos All',
        });
        firebase.database().ref('/messages/' + '/Lagos All/').push({
          "message": `${userName} just joined this Group... Welcome Him`,
          "date": new Date().toUTCString(),
          "author": userName,
          "userId": userId
        });
        resolve();
      });
    },
    success: Actions.userAddSuccess,
    error: Actions.userAddError
  },
  homepage: {
    remote(state){
      console.log('Routing......')
      browserHistory.push('chat')
    }
  }
}

export default UserSource;
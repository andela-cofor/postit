import alt from '../alt/';
import Firebase from 'firebase';
import { browserHistory } from 'react-router';
require("firebase/auth");
require("firebase/database");

var firebase = require("firebase/app");

class Actions {
  constructor(){
    this.generateActions(
      'channelsReceived',
      'channelsFailed',
      'messagesReceived',
      'messagesFailed',
      'channelOpened',
      'messagesLoading',
      'sendMessage',
      'messageSendSuccess',
      'messageSendError',
      'messageReceived',
      'addChannel',
      'channelAddSuccess',
      'channelAddError',
      'channelReceived',
      'addNumber',
      'numberAddSuccess',
      'numberAddError',
      'numbersReceived',
      'editDetails',
      'userAddSuccess',
      'userAddError',
      'FriendReceived',
      'FriendOpened',
      'FriendsReceived',
      'FriendsFailed',
      'logout'
    )
  }

  addToFriends(newUser){
    return(dispatch) => {
      const userNumber = newUser.trim()
      console.log(newUser, 'adding this to user')
      const user = JSON.parse(localStorage.getItem('state'))
      console.log(user);
      const localUserId = user.uid
      firebase.database().ref('/contacts/' +  userNumber ).on('value', (dataSnapshot) => {
          let contact = dataSnapshot.val();
          console.log(contact)
          if(!contact){
            console.log('Contact has not joined PostIt')
          } else{
            console.log('Add User')
            Object.keys(contact).forEach((contactDetails) =>{
              console.log(contact[contactDetails], '');
              const email = contact[contactDetails].email;
              const username = contact[contactDetails].username;
              const number = contact[contactDetails].number;
              const userId = contact[contactDetails].userId;

              firebase.database().ref('/allfriends/' +  localUserId + `/${userNumber}/`).on('value', (dataSnapshot) => {
                let myfriends = dataSnapshot.val();
                console.log(myfriends, 'All my friends')
                if(myfriends === null){
                  console.log('User has not been added to you')
                  firebase.database().ref('/friends/' + localUserId).push({
                    "userId": userId,
                    "username": username,
                    "email": email,
                    "number": number
                  });
                  firebase.database().ref('/allfriends/' + localUserId + `/${number}/`).set({
                    "userId": userId,
                    "username": username,
                    "email": email,
                    "number": number
                  });
                } else {
                  console.log('u have him')
                }
              })
            })
          }
        })
    }
  }

  resendUser(user){
    return(dispatch) => {
      dispatch(user)
    }
  }

  loginWithEmail(userDetails){
    // console.log('Login was called...')
    return(dispatch) => {
      const email = userDetails.email;
      const password = userDetails.password

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          const userId = res.uid
          const user = res
          dispatch(user)
          firebase.database().ref('/users/' + user.uid).on('value', (dataSnapshot) => {
            let userFirebase = dataSnapshot.val();
            if(userFirebase === null){
              console.log('not in dbb')
            }else if(userFirebase){
              console.log(user)
              localStorage.setItem('state', JSON.stringify(user));
              browserHistory.push('chat')
            }
          })
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode, 'errorCode')
        var errorMessage = error.message;
        console.log(errorMessage, 'errorMessage')
        // ...
      });
      email.html
    }
  }

  createUserWithEmailAndPassword(userDetails){
    return(dispatch) => {
      // console.log(userDetails, 'userDetails')
      const displayName = userDetails.firstName + ' ' + userDetails.lastName
      const email = userDetails.email;
      const password = userDetails.password
      const phoneNumber = userDetails.phoneNumber

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const userId = res.uid
          const user = {
            displayName: displayName,
            email: userDetails.email,
            password: userDetails.password,
            phoneNumber: userDetails.phoneNumber,
            uid: res.uid
          }
          dispatch(user);
          // browserHistory.push('chat')
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode, 'errorCode')
        var errorMessage = error.message;
        console.log(errorMessage, 'errorMessage')
        // ...
      });
    }
  }

  signInWithEmailAndPassword(userDetails){
    return (dispatch) => {
      console.log(userDetails);
      const email = userDetails.email
      const password = userDetails.password

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res, 'respond')
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode, 'err code')
        var errorMessage = error.message;
        console.log(errorMessage, 'err msg')
        // ...
      })
    }
  }

  login(router){
    return (dispatch) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        dispatch(user);
        console.log(user, 'User Details')

        firebase.database().ref('/users/' + user.uid).on('value', (dataSnapshot) => {
          let userFirebase = dataSnapshot.val();
          if(userFirebase === null){
            console.log('not in dbb')
            browserHistory.push('/phone')
          }else if(userFirebase){
            localStorage.setItem('state', JSON.stringify(user));
              // browserHistory.push('chat')
            browserHistory.push('chat')
          }
        })

        // browserHistory.push('chat')
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        return;
      });
    }
  }

  logout(){
    console.log('I was also called')
  }

  phoneNumber(number){
    return (dispatch) => {
      console.log(number, 'from actions')
      dispatch(number);
    }
  }
}

export default alt.createActions(Actions)
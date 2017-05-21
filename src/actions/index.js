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
    )
  }

  addUserToFriends(newUser){
    return(dispatch) => {
      console.log(newUser, 'adding this to user')
      const user = JSON.parse(localStorage.getItem('state'))
      console.log(user);
      const senderName = user.displayName;
      const newUser1 = newUser.replace(/\s/g, '');
      const userId = user.uid
      console.log
    
      firebase.database().ref('/contacts/' + newUser1).on('value', (dataSnapshot) => {
        console.log(dataSnapshot.val())
        const userInDb = dataSnapshot.val()
        if(userInDb === null){
          console.log('not in db')
        } else {
          console.log(userInDb)
          const username = userInDb.username
          const email = userInDb.email
          const phoneNumber = userInDb.number
          const userId = user.uid
          // firebase.database().ref('/friends/' ).push({
          //   "userId": userId,
          //   "username": username,
          //   "email": email,
          //   "phoneNumber": phoneNumber
          // });
          firebase.database().ref('/friends/' + `/${userId}/`).push({
            "userId": userId,
            "username": username,
            "email": email,
            "phoneNumber": phoneNumber
          });
        }
      })
    }
  }

  loginWithFirebase(){
    return(dispatch) => {

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

  // loginWithFirebase(){
  //   console.log(state, 'I finall')
  // }

  phoneNumber(number){
    return (dispatch) => {
      console.log(number, 'from actions')
      dispatch(number);
    }
  }
}

export default alt.createActions(Actions)
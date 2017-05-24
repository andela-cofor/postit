import { browserHistory } from 'react-router';
import axios from 'axios';
import alt from '../alt/';

require('firebase/auth');
require('firebase/database');

const firebase = require('firebase/app');

class Actions {
  constructor() {
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
      'logout',
    );
  }

  sendTextToUsers(value) {
    return () => {
      console.log(value, 'Received value from Critical');
      const channelName = value.channel;
      const message = value.message;

      firebase.database().ref(`/${channelName}/`).on('value', (dataSnapshot) => {
        const channelDetails = dataSnapshot.val();
        Object.keys(channelDetails).forEach((details) => {
          console.log(channelDetails[details].number, 'lalalal');
          axios.post('/api/critical', {
            receiver: channelDetails[details].number,
            channel: channelName,
            sender: 'PostIt App',
            message
          }).then((response) => {
            console.log(response, 'Res')
            Materialize.toast(response, 4000, 'rounded')
          }).catch((error) => {
            // console.log(error, 'Error')
          });
        });
        Materialize.toast(`Message and Text notification sent to members of ${channelName} group`, 4000, 'rounded')
      });
    };
  }

  sendEmailUsers(value) {
    return () => {
      const channelName = value.channel;
      const message = value.message;
      const user = JSON.parse(localStorage.getItem('state'));
      const senderEmail = user.email;
      firebase.database().ref(`/${channelName}/`).on('value', (dataSnapshot) => {
        const channelDetails = dataSnapshot.val();
        // console.log(channelDetails, 'for Emma tope');
        Object.keys(channelDetails).forEach((details) => {
          console.log(channelDetails[details].email, 'lalalal');
          axios.post('/api/urgent', {
            receiver: channelDetails[details].email,
            channel: channelName,
            sender: senderEmail,
            message
          }).then((response) => {
            Materialize.toast(response, 4000, 'rounded')
          }).catch((error) => {
          });
        });
        Materialize.toast(`Email notification sent to members of ${channelName} group`, 4000, 'rounded')
      });
    };
  }

  inviteFriendToChannel(emailDetails) {
    return () => {
      console.log(emailDetails);
      const receiverEmail = emailDetails.email;
      const channelName = emailDetails.channelName;
      const user = JSON.parse(localStorage.getItem('state'));
      const senderEmail = user.email;
      axios.post('/api/invite/email', {
        receiver: receiverEmail,
        channel: channelName,
        sender: senderEmail
      }).then((response) => {
        Materialize.toast(response, 4000, 'rounded')
        console.log(error)
        console.log(`${receiverEmail} has been invited to join channel`);
      }).catch((error) => {
        Materialize.toast(`${receiverEmail} is an invalid email address`, 4000, 'rounded')
        console.log(error);
      });
    };
  }

  addToFriends(newUser) {
    return () => {
      const userNumber = newUser.trim();
      console.log(newUser, 'adding this to user');
      const user = JSON.parse(localStorage.getItem('state'));
      console.log(user);
      const localUserId = user.uid;
      firebase.database().ref('/contacts/' + userNumber).on('value', (dataSnapshot) => {
        const contact = dataSnapshot.val();
        if (!contact) {
          Materialize.toast('Contact has not joined PostIt', 4000, 'rounded');
        } else {
          Materialize.toast('Adding... User', 4000, 'rounded');
          Object.keys(contact).forEach((contactDetails) => {
            console.log(contact[contactDetails], '');
            const email = contact[contactDetails].email;
            const username = contact[contactDetails].username;
            const number = contact[contactDetails].number;
            const userId = contact[contactDetails].userId;

            firebase.database().ref('/allfriends/' + localUserId + `/${userNumber}/`).on('value', (dataSnapshot) => {
              const myfriends = dataSnapshot.val();
              console.log(myfriends, 'All my friends');
              if (myfriends === null){
                console.log('User has not been added to you')
                firebase.database().ref('/friends/' + localUserId).push({
                  'userId': userId,
                  'username': username,
                  'email': email,
                  'number': number
                });
                firebase.database().ref('/allfriends/' + localUserId + `/${number}/`).set({
                  'userId': userId,
                  'username': username,
                  'email': email,
                  'number': number
                });
              }
            });
          });
          Materialize.toast(`${userNumber} has been added reload page`, 4000, 'rounded');
        }
      });
      browserHistory.push('chat')
    };
  }

  resendUser(user) {
    return (dispatch) => {
      console.log(user, 'got to resendUser');
      dispatch(user);
      
    };
  }

  loginWithEmail(userDetails) {
    // console.log('Login was called...')
    return (dispatch) => {
      const email = userDetails.email;
      const password = userDetails.password;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          const user = res;
          dispatch(user);
          firebase.database().ref('/users/' + user.uid).on('value', (dataSnapshot) => {
            const userFirebase = dataSnapshot.val();
            if (userFirebase === null) {
              console.log('not in dbb');
            } else if (userFirebase) {
              console.log(user);
              localStorage.setItem('state', JSON.stringify(user));
              browserHistory.push('chat');
            }
          });
        })
        .catch((error) => {
        // Handle Errors here.
          const errorCode = error.code;
           Materialize.toast(errorCode, 4000) 
          console.log(errorCode, 'errorCode');
          const errorMessage = error.message;
          console.log(errorMessage, 'errorMessage');
          // ...
        });
      email.html;
    };
  }

  createUserWithEmailAndPassword(userDetails) {
    return (dispatch) => {
      // console.log(userDetails, 'userDetails')
      const displayName = userDetails.firstName + ' ' + userDetails.lastName;
      const email = userDetails.email;
      const password = userDetails.password;
      const profilePic = userDetails.photoUrl

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const user = {
            displayName: displayName,
            email: userDetails.email,
            password: userDetails.password,
            phoneNumber: userDetails.phoneNumber,
            uid: res.uid,
            'profilePic': profilePic
          };
          dispatch(user);
          // browserHistory.push('chat')
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          Materialize.toast(errorCode, 4000, 'rounded')
          const errorMessage = error.message;
          // ...
        });
    };
  }

  signInWithEmailAndPassword(userDetails) {
    return () => {
      console.log(userDetails);
      const email = userDetails.email;
      const password = userDetails.password;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res, 'respond');
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          console.log(errorCode, 'err code');
          const errorMessage = error.message;
          console.log(errorMessage, 'err msg');
          // ...
        });
    };
  }

  login() {
    return (dispatch) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        dispatch(user);
        console.log(user, 'User Details');

        firebase.database().ref('/users/' + user.uid).on('value', (dataSnapshot) => {
          const userFirebase = dataSnapshot.val();
          if (userFirebase === null) {
            console.log('not in dbb');
            browserHistory.push('/phone');
          } else if (userFirebase) {
            localStorage.setItem('state', JSON.stringify(user));
              // browserHistory.push('chat')
            browserHistory.push('chat');
          }
        });

        // browserHistory.push('chat')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        Materialize.toast(errorCode, 4000, 'rounded')
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    };
  }

  logout() {
    console.log('I was also called');
  }

  phoneNumber(number) {
    return (dispatch) => {
      console.log(number, 'from actions');
      dispatch(number);
    };
  }

  sendPasswordResetEmail(userDetails){
    console.log(userDetails, 'User Details');
    const auth = firebase.auth();
    const emailAddress = userDetails;
    console.log(emailAddress);

    auth.sendPasswordResetEmail(emailAddress).then((res) => {
      // Email sent.
      Materialize.toast(res, 4000, 'rounded')
      console.log(res, 'from firebase')
    }, function(error) {
      // An error happened.
      Materialize.toast(error, 4000, 'rounded')
      console.log(error, 'from firebase');
    });
  }
}

export default alt.createActions(Actions);

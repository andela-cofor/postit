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
      const channelName = value.channel;
      const message = value.message;

      firebase.database().ref(`/${channelName}/`).on('value', (dataSnapshot) => {
        const channelDetails = dataSnapshot.val();
        Object.keys(channelDetails).forEach((details) => {
          axios.post('/api/critical', {
            receiver: channelDetails[details].number,
            channel: channelName,
            sender: 'PostIt App',
            message
          }).then((response) => {
            Materialize.toast(response, 4000, 'rounded')
          }).catch((error) => {
            Materialize.toast(error, 4000, 'rounded')
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
        Object.keys(channelDetails).forEach((details) => {
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
      }).catch((error) => {
        Materialize.toast(`${receiverEmail} is an invalid email address`, 4000, 'rounded')
      });
    };
  }

  addToFriends(newUser) {
    return () => {
      const userNumber = newUser.trim();
      const user = JSON.parse(localStorage.getItem('state'));
      const localUserId = user.uid;
      firebase.database().ref('/contacts/' + userNumber).on('value', (dataSnapshot) => {
        const contact = dataSnapshot.val();
        if (!contact) {
          Materialize.toast('Contact has not joined PostIt', 4000, 'rounded');
        } else {
          Materialize.toast('Adding... User', 4000, 'rounded');
          Object.keys(contact).forEach((contactDetails) => {
            const email = contact[contactDetails].email;
            const username = contact[contactDetails].username;
            const number = contact[contactDetails].number;
            const userId = contact[contactDetails].userId;

            firebase.database().ref('/allfriends/' + localUserId + `/${userNumber}/`).on('value', (dataSnapshot) => {
              const myfriends = dataSnapshot.val();
              if (myfriends === null){
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
      dispatch(user);
      
    };
  }

  loginWithEmail(userDetails) {
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
            } else if (userFirebase) {
              localStorage.setItem('state', JSON.stringify(user));
              browserHistory.push('chat');
            }
          });
        })
        .catch((error) => {
        // Handle Errors here.
          const errorCode = error.code;
           Materialize.toast(errorCode, 4000);
          const errorMessage = error.message;
          // ...
        });
      email.html;
    };
  }

  createUserWithEmailAndPassword(userDetails) {
    return (dispatch) => {
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
            profilePic: profilePic
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
      const email = userDetails.email;
      const password = userDetails.password;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
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

        firebase.database().ref('/users/' + user.uid).on('value', (dataSnapshot) => {
          const userFirebase = dataSnapshot.val();
          if (userFirebase === null) {
            browserHistory.push('/phone');
          } else if (userFirebase) {
            localStorage.setItem('state', JSON.stringify(user));
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

  phoneNumber(number) {
    return (dispatch) => {
      dispatch(number);
    };
  }

  sendPasswordResetEmail(userDetails){
    const auth = firebase.auth();
    const emailAddress = userDetails;

    auth.sendPasswordResetEmail(emailAddress).then((res) => {
      // Email sent.
      Materialize.toast(res, 4000, 'rounded')
    }, function(error) {
      // An error happened.
      Materialize.toast(error, 4000, 'rounded')
    });
  }
}

export default alt.createActions(Actions);

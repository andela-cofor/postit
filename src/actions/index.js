import alt from '../alt/';
import Firebase from 'firebase';
import { browserHistory } from 'react-router';

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
    )
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

        firebase.database().ref('/users/' + user.uid).on('value', (dataSnapshot) => {
          let userFirebase = dataSnapshot.val();
          console.log(user, 'User Details')
          if(userFirebase === null){
            console.log('not in dbb')
            browserHistory.push('/phone')
          }else if(userFirebase){
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

  phoneNumber(number){
    return (dispatch) => {
      console.log(number, 'from actions')
      dispatch(number);
    }
  }
}

export default alt.createActions(Actions)
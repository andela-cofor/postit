import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

// var firebase = require("firebase/app");
var firebase = null;

let MessageSource = {
  getMessages: {
    remote(state){
      if(firebase){
        firebase.database().ref.off();
      }
      firebase = require("firebase/app");

      return new Promise((resolve, reject) => {
        firebase.database().ref('/messages/' + state.selectedChannel.key).on('value', (dataSnapshot) => {
          let messages = dataSnapshot.val();
          resolve(messages);
        })
      });
    },
    success: Actions.messagesReceived,
    error: Actions.messagesFailed
  }
}

export default MessageSource;

import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

var firebase = null;

let MessageSource = {

  sendMessage: {
    remote(state){
      console.log('Message', state)
      return new Promise((resolve, reject) => {
        if(!firebase){
          return resolve()
        }
        firebase.database().ref('/messages/' + state.selectedChannel.name).push({
          "message": state.message,
          "date": new Date().toUTCString(),
          "author": state.user.displayName,
          "userId": state.user.uid,
          "profilePic": state.user.photoURL
        });
        resolve();
      });
    },
    success: Actions.messageSendSuccess,
    error: Actions.messageSendError
  },

  getMessages: {
    remote(state){
      if(firebase){
        firebase = null
      }
      firebase = require("firebase/app");
      return new Promise((resolve, reject) => {
        firebase.database().ref('/messages/' + state.selectedChannel.name).on('value', (dataSnapshot) => {
          let messages = dataSnapshot.val();
          resolve(messages);
          firebase.database().ref('/messages/' + state.selectedChannel.name).on('child_added', (msg) => {
            console.log(msgVal)
            let msgVal = msg.val();
            msgVal.key = msg.key;
            Actions.messageReceived(msgVal)
          })
        })
      });
    },
    success: Actions.messagesReceived,
    error: Actions.messagesFailed,
    loading: Actions.messagesLoading
  }
}

export default MessageSource;

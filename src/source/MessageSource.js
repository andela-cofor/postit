import Actions from '../actions/';
require('firebase/auth');
require('firebase/database');

let firebase = null;

const MessageSource = {

  sendMessage: {
    remote(state) {
      return new Promise((resolve, reject) => {
        if (!firebase) {
          return resolve();
        }
        // console.log(JSON.parse(localStorage.getItem('state')))
        const user = JSON.parse(localStorage.getItem('state'));
        const userPic = user.photoURL;
        firebase.database().ref('/messages/' + state.selectedChannel.name).push({
          'message': state.message,
          'date': new Date().toUTCString(),
          'author': state.user.displayName,
          'userId': state.user.uid,
          'profilePic': userPic
        });
        resolve();
      });
    },
    success: Actions.messageSendSuccess,
    error: Actions.messageSendError
  },

  getMessages: {
    remote(state) {
      if (firebase) {
        firebase = null;
      }
      firebase = require('firebase/app');
      return new Promise((resolve, reject) => {
        firebase.database().ref('/messages/' + state.selectedChannel.name).on('value', (dataSnapshot) => {
          const messages = dataSnapshot.val();
          resolve(messages);
          firebase.database().ref('/messages/' + state.selectedChannel.name).on('child_added', (msg) => {
            const msgVal = msg.val();
            msgVal.key = msg.key;
            Actions.messageReceived(msgVal);
          });
        });
      });
    },
    success: Actions.messagesReceived,
    error: Actions.messagesFailed,
    loading: Actions.messagesLoading
  }
};

export default MessageSource;

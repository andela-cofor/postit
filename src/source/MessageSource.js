import Actions from '../actions/';
require('firebase/auth');
require('firebase/database');

let firebase = null;
let messageSent = null;
let initialLoad = true;

const MessageSource = {

  sendMessage: {
    remote(state) {
      return new Promise((resolve, reject) => {
        if (!firebase) {
          return resolve();
        }
        const user = JSON.parse(localStorage.getItem('state'));
        let userPic;
        if(user.profilePic){
          userPic = user.profilePic;
        } else if(user.photoURL){
          userPic = user.photoURL;
        }
        messageSent = state.user.uid;
        firebase.database().ref('/messages/' + `/${state.selectedChannel.name}/`).push({
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
      const user = JSON.parse(localStorage.getItem('state'));
      firebase = require('firebase/app');
      return new Promise((resolve, reject) => {
        firebase.database().ref('/messages/' + state.selectedChannel.name).on('value', (dataSnapshot) => {
          const messages = dataSnapshot.val();
          if (!messageSent && !initialLoad) {
            if(window.Notification && Notification.permission !== "denied") {
              Notification.requestPermission(function(status) {
                var ms = 15000;
                var en = new Notification(`You have a new message from ${state.selectedChannel.name} Group`, { 
                    body: 'From: PostIt App',
                });
                en.onshow = function() { setTimeout(en.close, ms) }
              });
            }
            messageSent = null;
          }
          resolve(messages);
          initialLoad = false;
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

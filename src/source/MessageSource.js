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
        // console.log(JSON.parse(localStorage.getItem('state')))
        const user = JSON.parse(localStorage.getItem('state'));
        console.log(user, 'this is the u')
        // const userPic = user.photoURL;
        let userPic;
        if(user.profilePic){
          console.log('pu')
          userPic = user.profilePic;
        } else if(user.photoURL){
          console.log('pp')
          userPic = user.photoURL;
        }
        console.log(userPic)
        messageSent = state.user.uid;
        console.log('got her chan', state.selectedChannel.name)
        firebase.database().ref('/messages/' + `/${state.selectedChannel.name}/`).push({
          'message': state.message,
          'date': new Date().toUTCString(),
          'author': state.user.displayName,
          'userId': state.user.uid,
          'profilePic': userPic
        });
        // alert(`I ${state.user.uid} am sending an awesome message to every mnember in the group :)`);
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
              // alert(`You have a new message from ${state.selectedChannel.name} Group`);
              Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
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
          // alert('i am called upon :) :)');
          initialLoad = false;
          // messageSent = null;
          firebase.database().ref('/messages/' + state.selectedChannel.name).on('child_added', (msg) => {
            // alert();
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

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
        const userPic = user.photoURL;
        messageSent = state.user.uid;
        firebase.database().ref('/messages/' + state.selectedChannel.name).push({
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
              // alert();
              console.log('bla')
              Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
                let n = new Notification('PostIt', { 
                  body: 'You have a new notification!',
                  icon: '../../public/images/PostIt.jpg' // optional
                }); 
              });
              setTimeout(n.close.bind(n), 2000);
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

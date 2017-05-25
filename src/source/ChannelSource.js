import Actions from '../actions/';

require('firebase/auth');
require('firebase/database');

const firebase = require('firebase/app');

const ChannelSource = {
  addChannel: {
    remote(state) {
      return new Promise((resolve, reject) => {
        const userId = state.user.uid;
        const userEmail = state.user.email;
        const username = state.user.displayName;
        const chan = state.channel.trim();
        firebase.database().ref('/users/' + state.user.uid + '/profileDetails/' + '/number/' ).on('value', (dataSnapshot) => {
          const userPhone = dataSnapshot.val();
          const phoneNumber = userPhone;
          firebase.database().ref(`/${chan}/` + userId).on('value', (dataSnapshot) => {
            const channelDetails = dataSnapshot.val();
            if (channelDetails) {
            } else {
              firebase.database().ref('/users/' + userId + '/channels/').set({
                'name': chan,
              });
              firebase.database().ref('/channels/' + userId).push({
                'name': chan,
              });
              // firebase.database().ref('/channelsList/').push({
              //   "name": chan,
              // });
              firebase.database().ref(`/${chan}/` + userId).set({
                'email': userEmail,
                'username': username,
                'number': phoneNumber,
              });
              firebase.database().ref('/messages/' + `/${chan}/`).push({
                'message': 'Welcome...',
                'date': new Date().toUTCString(),
                'author': state.user.displayName,
                'userId': state.user.uid,
                'profilePic': state.user.photoURL
              });
              resolve();
            }
          });
        });
      });
    },
    success: Actions.channelAddSuccess,
    error: Actions.channelAddError
  },
  getChannels: {
    remote(state) {
      // console.log(state, 'state in channels')
      return new Promise((resolve, reject) => {
        firebase.database().ref('/channels/' +  state.user.uid).on('value', (dataSnapshot) => {
          const channels = dataSnapshot.val();
          resolve(channels);
          firebase.database().ref('/channels/' + state.user.uid).on('child_added', (chan) => {
            const chanVal = chan.val();
            chanVal.key = chan.key;
            Actions.channelReceived(chanVal);
          });
        });
      });
    },
    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  }
};

export default ChannelSource;

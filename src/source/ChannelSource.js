import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

var firebase = require("firebase/app");

let ChannelSource = {
  addChannel: {
    remote(state){
      console.log(state, 'looking')
      console.log('here baby')
      return new Promise((resolve, reject) => {
        firebase.database().ref('/users/' + state.user.displayName + '/channels/').push({
          "name": 'firebase',
        });
        firebase.database().ref('/messages/firebase/' ).push({
          "message": 'Welcome...',
          "date": new Date().toUTCString(),
          "author": state.user.displayName,
          "userId": state.user.uid,
          "profilePic": state.user.photoURL
        });
        resolve(channels);
      });
    },
    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  },
  getChannels: {
    remote(state){
      return new Promise((resolve, reject) => {
        firebase.database().ref('/users/' + state.user.displayName + '/channels/').on('value', (dataSnapshot) => {
          let channels = dataSnapshot.val();
          resolve(channels);
        })
      });
    },
    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  }
}

export default ChannelSource;
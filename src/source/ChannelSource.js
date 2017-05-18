import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

var firebase = require("firebase/app");

let ChannelSource = {
  addChannel: {
    remote(state){
      return new Promise((resolve, reject) => {
        let chan = state.channel.trim()
        firebase.database().ref('/users/' + state.user.displayName + '/channels/').push({
          "name": chan,
        });
        firebase.database().ref(`/messages/${chan}/` ).push({
          "message": 'Welcome...',
          "date": new Date().toUTCString(),
          "author": state.user.displayName,
          "userId": state.user.uid,
          "profilePic": state.user.photoURL
        });
        resolve();
      });
    },
    success: Actions.channelAddSuccess,
    error: Actions.channelAddError
  },
  getChannels: {
    remote(state){
      return new Promise((resolve, reject) => {
        firebase.database().ref('/users/' + state.user.displayName + '/channels/').on('value', (dataSnapshot) => {
          let channels = dataSnapshot.val();
          resolve(channels);
          firebase.database().ref('/users/' + state.user.displayName + '/channels/').on('child_added', (chan) => {
            let chanVal = chan.val();
            chanVal.key = chan.key;
            Actions.channelReceived(chanVal)
          })
        })
      });
    },
    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  }
}

export default ChannelSource;
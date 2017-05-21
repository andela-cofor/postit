import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

var firebase = require("firebase/app");

let ChannelSource = {
  addChannel: {
    remote(state){
      return new Promise((resolve, reject) => {
        const userId = state.user.uid
        console.log(state)
        const userEmail = state.user.email
        const username = state.user.displayName
        let chan = state.channel.trim()
        firebase.database().ref('/users/' +  state.user.uid + '/profileDetails/' + '/number/' ).on('value', (dataSnapshot) => {
          let userPhone = dataSnapshot.val();
          // console.log(userDetails)
          const phoneNumber = userPhone;
          firebase.database().ref(`/${chan}/` + userId).on('value', (dataSnapshot) => {
            let channelDetails = dataSnapshot.val();
            // console.log(channelDetails)
            if(channelDetails){
              console.log('channel alreadt exists')
            }else {
              firebase.database().ref('/users/' + userId + '/channels/').set({
                'name': chan,
              });
              firebase.database().ref('/channels/' + userId).push({
                "name": chan,
              });
              // firebase.database().ref('/channelsList/').push({
              //   "name": chan,
              // });
              firebase.database().ref(`/${chan}/` + userId).push({
                "email": userEmail,
                "username": username,
                "number": phoneNumber,
              });
              firebase.database().ref('/messages/' + `/${chan}/`).push({
                "message": 'Welcome...',
                "date": new Date().toUTCString(),
                "author": state.user.displayName,
                "userId": state.user.uid,
                "profilePic": state.user.photoURL
              });
              resolve();
            }
          })
        })
      });
    },
    success: Actions.channelAddSuccess,
    error: Actions.channelAddError
  },
  getChannels: {
    remote(state){
      console.log(state, 'state in channels')
      return new Promise((resolve, reject) => {
        firebase.database().ref('/channels/' +  state.user.uid ).on('value', (dataSnapshot) => {
          let channels = dataSnapshot.val();
          resolve(channels);
          firebase.database().ref('/channels/' + state.user.uid ).on('child_added', (chan) => {
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
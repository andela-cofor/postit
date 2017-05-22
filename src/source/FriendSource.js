import Actions from '../actions/';
import Firebase from 'firebase';
require("firebase/auth");
require("firebase/database");

var firebase = require("firebase/app");

let FriendSource = {
  getFriends: {
    remote(state){
      console.log('I was called');
      // console.log(state, 'state in channels')
      const user = JSON.parse(localStorage.getItem('state'))
      console.log(user, 'Here I am')
      const userId = user.uid
      return new Promise((resolve, reject) => {
        firebase.database().ref('/friends/' +  userId ).on('value', (dataSnapshot) => {
          let friends = dataSnapshot.val();
          console.log('Friends', friends)
          resolve(friends);
        //   firebase.database().ref('/channels/' + state.user.uid ).on('child_added', (chan) => {
        //     let chanVal = chan.val();
        //     chanVal.key = chan.key;
        //     Actions.channelReceived(chanVal)
        //   })
        })
      });
    },
    success: Actions.FriendsReceived,
    error: Actions.FriendsFailed
  }
}

export default FriendSource;
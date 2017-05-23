import Actions from '../actions/';

require('firebase/auth');
require('firebase/database');

const firebase = require('firebase/app');

const FriendSource = {
  getFriends: {
    remote() {
      console.log('I was called');
      // console.log(state, 'state in channels')
      const user = JSON.parse(localStorage.getItem('state'));
      const userId = user.uid;
      return new Promise((resolve, reject) => {
        firebase.database().ref('/friends/' + userId).on('value', (dataSnapshot) => {
          const friends = dataSnapshot.val();
          console.log('Friends', friends);
          resolve(friends);
        });
      });
    },
    success: Actions.FriendsReceived,
    error: Actions.FriendsFailed
  }
};

export default FriendSource;

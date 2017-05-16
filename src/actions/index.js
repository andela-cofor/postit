import alt from '../alt/';
import Firebase from 'firebase';

class Actions {
  login(args){
    return (dispatch) => {
      // let firebaseRef = new Firebase('https://postit-3ad4f.firebaseio.com')
      // firebaseRef.authWithOAuthPopup('google', (error, user) => {
      //   if(error) {
      //     return 
      //   }
      //   dispatch(user);
      // })
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        dispatch(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        return;
      });
    }
  }
}

export default alt.createActions(Actions)
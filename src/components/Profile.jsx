import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText } from 'material-ui/Card';
import Actions from '../actions/';
import ChatStore from '../store/ChatStore';

const firebase = require('firebase/app');

/**
 * @class Profile
 * @extends {React.Component}
 */
@connectToStores
class Profile extends React.Component {

  /**
   * @static
   * @returns ChatStore
   * @memberof Profile
   */
  static getStores() {
    return [ChatStore];
  }

  /**
   * @static
   * @returns state
   * @memberof Profile
   */
  static getPropsFromStores() {
    return ChatStore.getState();
  }

  /**
   * Creates an instance of Profile.
   * @memberof Profile
   */
  constructor() {
    super();
    this.state = {
      userDetails: {
        phoneNumber: '',
        userName: ''
      },
      profilePicture: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.setProfilePic = this.setProfilePic.bind(this);
  }

  /**
   * @memberof Profile
   */
  componentDidMount() {
    const state = ChatStore.getState();
    console.log(this.props.user);
  }

  /**
   * @param {any} url
   * @memberof Profile
   */
  setProfilePic(url) {
    console.log('I got url');
    this.setState({
      profilePicture: url
    });
  }

  /**
   * @param {any} event
   * @memberof Profile
   */
  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }

  /**
   * @param {any} event
   * @memberof Profile
   */
  onSubmit(event) {
    event.preventDefault();
    Actions.editDetails(this.state.userDetails);
    console.log(this.state.userDetails);
  }

  /**
   * @param {any} evt
   * @memberof Profile
   */
  handleFileUpload(evt) {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onload = function (evt) {
      console.log(evt)
      const mediaRef = firebase.storage().ref('images/').child('pest')
      mediaRef.putString(evt.target.result).then((snap) => {
        console.log(snap);
        // this.setProfilePic(snap.downloadURL);
      });
    };
    reader.readAsDataURL(file);

    firebase.storage().ref('images/').child('pest').getDownloadURL()
      .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const blob = xhr.response;
          console.log('this is blob', blob);
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element:
        const img = document.getElementById('myimg');

        img.src = url;
        // this.setState({
        //   profilePicture: url
        // });
        // console.log(url, 'Url');
      })
        .catch((error) => {
      // Handle any errors
          console.log(error);
        });
  }

  /**
   * @returns Card
   * @memberof Profile
   */
  render() {
    return (
      <Card style={{
        'maxWidth': '800px',
        'margin': '30px auto',
        'padding': '50px'
      }}>
      <CardText style={{
        'textAlign': 'center'
      }}>
         Welcome {this.props.user.displayName} you can edit your profile details
        </CardText>
        <Avatar
          src={this.state.profilePicture}
          size={50}
          style={{
            margin: 5
          }}
        />
        <FlatButton label="Change Picture" labelPosition="before">
           <input
            type="file"
            onChange={(e) => this.handleFileUpload(e)}
            id="fileButton"
          />
         </FlatButton>
        <form className="mui-form" onSubmit={this.onSubmit}>
          <br /><br /><br /><br />
          <div className="mui-textfield">
            <TextField
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              placeholder="Enter your new phone number"
              style={{
                paddingTop: 15,
              }}
              type="number"
            /><br />
          </div>
          <div className="mui-textfield">
            <TextField
              name="userName"
              value={this.state.userName}
              onChange={this.handleChange}
              placeholder="Enter your new userName"
              style={{
                paddingTop: 15,
              }}
              type="text"
            /><br />
          </div>
          <br/><br/>
          <div>
          <RaisedButton
            label="Submit"
            type="submit"
            primary={true}
            style={{ margin: 12, }}
          />
          </div>
        </form>
      </Card>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Profile;

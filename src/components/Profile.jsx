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
   * Returns available store
   * @static
   * @returns ChatStore
   * @memberof Profile
   */
  static getStores() {
    return [ChatStore];
  }

  /**
   * Returns Props from store
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
      photoURL: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Executes before componentWillMount
   * @memberof Profile
   */
  componentWillMount() {
    const state = ChatStore.getState();
    if (state.user === null) {
      if (!JSON.parse(localStorage.getItem('state'))) {
        browserHistory.push('/');
      } else {
        const user = JSON.parse(localStorage.getItem('state'));
        Actions.resendUser(user);
        if(user.photoURL){
          this.state = (Object.assign({}, this.state, {
            photoURL: user.photoURL
          }));
        }
        if (user.profilePic){
          this.state = (Object.assign({}, this.state, {
            photoURL: user.profilePic
          }));
        }
      }
    }
  }

  /**
   * Set state of userDetails
   * @param {object} event
   * @memberof Profile
   * @returns {void}
   */
  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }

  /**
   * Sends user details onclick of submit button
   * @param {object} event
   * @memberof Profile
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    Actions.editDetails(this.state.userDetails);
    console.log(this.state.userDetails);
  }

  /**
   * @returns Card
   * @memberof Profile
   */
  render() {
    return (
      <Card className="loginCard">
      <CardText className="center">
        </CardText>
        <Avatar
          src={this.state.photoURL}
          size={50}
        />
        <form className="mui-form" onSubmit={this.onSubmit}>
          <br /><br /><br /><br />
          <div className="mui-textfield">
            <TextField
              name="phoneNumber"
              onChange={this.handleChange}
              placeholder="Enter your new phone number"
              type="number"
            /><br />
          </div>
          <div className="mui-textfield">
            <TextField
              name="userName"
              onChange={this.handleChange}
              placeholder="Enter your new userName"
              type="text"
            /><br />
          </div>
          <br/><br/>
          <div>
            <RaisedButton
              label="Submit"
              type="submit"
              primary={true}
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

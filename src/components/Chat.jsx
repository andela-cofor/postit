import React from 'react';
import { browserHistory } from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import RaisedButton from 'material-ui/RaisedButton';
import trim from 'trim';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import FriendList from './FriendList.jsx';
import MessageBox from './MessageBox.jsx';
import ChatStore from '../store/ChatStore';
import Actions from '../actions/index';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

/**
 * @class Chat
 * @extends {React.Component}
 */
@connectToStores
class Chat extends React.Component {

  /**
   * Creates an instance of Chat.
   * @param {object} props
   * @memberof Chat
   */
  constructor(props) {
    ChatStore.getFriends();
    super(props);
    this.state = {
      channel: '',
      emailDetails: {
        email: '',
        channelName: '',
        number: ''
      },
      photoURL: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.addAFriend = this.addAFriend.bind(this);
    this.inviteFriend = this.inviteFriend.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.inviteFriend2Channel = this.inviteFriend2Channel.bind(this);
    this.addNumber = this.addNumber.bind(this);
  }

  /**
   * Execute before component mounts
   * @memberof Chat class
   * @return {void}
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
   * Returns store from chat store
   * @static
   * @returns ChatStore
   * @memberof Chat
   * @return {void}
   */
  static getStores() {
    return [ChatStore];
  }

  /**
   * Get props from chat store
   * @static
   * @returns state
   * @memberof Chat
   * @return {void}
   */
  static getPropsFromStores() {
    return ChatStore.getState();
  }

  /**
   * Calls Add channel
   * @memberof Chat
   * @return {void}
   */
  onClick() {
    ChatStore.addChannel();
  }


  /**
   * Set state of value
   * @param {object} evt
   * @memberof Chat
   * @return {void}
   */
  onChange(evt) {
    this.setState({
      channel: evt.target.value
    });
  }


  /**
   * Routes user to profile page
   * @returns {void}
   * @memberof Chat
   */
  loginPage() {
    browserHistory.push('/profile');
  }


  /**
   * Monitor click on enter key
   * @param {object} evt
   * @memberof Chat
   */
  onKeyUp(evt) {
    if (evt.keyCode === 13 && trim(evt.target.value) !== '') {
      evt.preventDefault();
      Actions.addChannel(this.state.channel);
      Materialize.toast(`${this.state.channel} has been added `, 4000, 'rounded')
      document.getElementById('addChannel').value = '';
      this.state = (Object.assign({}, this.state, {
        channel: ''
      }));
    }
  }

  /**
   * Add a cahannel to channel list
   * @memberof Chat
   * @returns {void}
   */
  addChannel() {
    if(this.state.channel == ''){
      Materialize.toast('Enter a valid channel name', 4000, 'rounded')
    } else {
      Actions.addChannel(this.state.channel);
      Materialize.toast(`${this.state.channel} has been added `, 4000, 'rounded');
      this.state = (Object.assign({}, this.state, {
        channel: ''
      }));
      document.getElementById('inviteFriend').value = '';
    }
    document.getElementById('addChannel').value = '';
  }

  /**
   * Add a friend to friend list
   * @param {object} event
   * @memberof Chat
   */
  addAFriend(event) {
    const number = event.target.value.trim();
    this.state = (Object.assign({}, this.state, {
      number: number
    }));
    if (event.keyCode === 13 && trim(event.target.value) !== '') {
      event.preventDefault();
      Actions.addToFriends(event.target.value);
      document.getElementById('inviteFriend').value = '';
    }
  }

  /**
   * Add user number to contact list
   * @memberof Chat
   * @return {void}
   */
  addNumber(){
    if(this.state.number == ''){
      Materialize.toast('Number cannot be empty', 4000, 'rounded');
    } else {
      Actions.addToFriends(this.state.number);
      document.getElementById('inviteFriend').value = '';
    }
  }

  /**
   * Invite friend via email
   * @param {object} event
   * @memberof Chat
   */
  inviteFriend(event) {
    event.preventDefault();
    const email = event.target.value.trim();
    const state = ChatStore.getState();
    this.state = (Object.assign({}, this.state, {
      emailDetails:{
        email: email,
        channelName: state.selectedChannel.name
      }
    }));
    if (event.keyCode === 13 && trim(event.target.value) !== '') {
      Actions.inviteFriendToChannel(this.state.emailDetails);
      document.getElementById('inviteFriendEmail').value = '';
    }
  }

  /**
   * Invites friend to channel
   * @memberof Chat
   * @return null
   */
  inviteFriend2Channel() {
    if(this.state.emailDetails.email == ''){
      Materialize.toast('Email cannot be null', 4000, 'rounded');
    } else {
      Actions.inviteFriendToChannel(this.state.emailDetails);
      document.getElementById('inviteFriendEmail').value = '';
    }
  }

  /**
   * @returns textarea
   * @memberof Chat
   */
  render() {
    return (
      <div style={{
        overflow: scroll,
        maxHeight: 10,
      }}
      iconElementRight={
        <RaisedButton
          label='Profile'
          style={{ margin: 12, }}
          onClick={this.loginPage}
            />
      }>
        <Avatar
          onClick={this.loginPage}
          src={this.state.photoURL}
          size={50}
          style={{
            margin: 5,
            marginLeft: 1200
          }}
        />
        <div className="row">
          <div className="col s4">
            <textarea
              id="addChannel"
              placeholder="Add a group..."
              value={this.state.message}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
              className="col s6"
              style={{
                borderColor: '#D0D0D0',
                resize: 'none',
                borderRadius: 3,
                minHeight: 50,
                color: '#555',
                fontSize: 14,
                outline: 'auto 0px',
                marginTop: 10
              }} />
              <RaisedButton
              label='ADD'
              onClick={this.addChannel}
              className="col s3 offset-s1"
                style={{marginTop: 15}}
                />
          </div>
          <div className="col s4">
            <textarea
              placeholder="Invite friend with email..."
              id="inviteFriendEmail"
              name="email"
              value={this.state.newUserEmail}
              onKeyUp={this.inviteFriend}
              className="col s6 offset-s1"
              style={{
                borderColor: '#D0D0D0',
                resize: 'none',
                borderRadius: 3,
                minHeight: 50,
                color: '#555',
                fontSize: 14,
                outline: 'auto 0px',
                marginTop: 10,
              }} />
              <RaisedButton
                className="col s3 offset-s1"
                onClick={this.inviteFriend2Channel}
                style={{marginTop: 15}}
                label='INVITE'
                />
          </div>
          <div className="col s4">
            <textarea
              id="inviteFriend"
              type="number"
              placeholder="Add a a friend with number..."
              onKeyUp={this.addAFriend}
              className="col s6 offset-s1"
              style={{
                borderColor: '#D0D0D0',
                resize: 'none',
                borderRadius: 3,
                minHeight: 50,
                color: '#555',
                fontSize: 14,
                outline: 'auto 0px',
                marginTop: 10
              }} />
              <RaisedButton
              onClick={this.addNumber}
              style={{marginTop: 15}}
              label='ADD'
              className="col s3 offset-s1"
                />
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <ChannelList {...this.props}/>
          </div>
          <div className="col s6">
            <MessageList />
          </div>
          <div className="col s3">
            <FriendList />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <MessageBox />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;

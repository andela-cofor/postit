import _ from 'lodash';
import { decorate, bind, datasource } from 'alt-utils/lib/decorators';
import alt from '../alt/';
import Actions from '../actions/';
import ChannelSource from '../source/ChannelSource';
import MessageSource from '../source/MessageSource';
import UserSource from '../source/UserSource';
import FriendSource from '../source/FriendSource';


/**
 * @class ChatStore
 */
@datasource(ChannelSource, MessageSource, UserSource, FriendSource)
@decorate(alt)
class ChatStore {
  constructor() {
    this.state = {
      user: null,
      messages: null,
      messagesLoading: true
    };
  }

  /**
   * @param {object} friends
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.FriendsReceived)
  receivedFriends(friends) {
    let selectedFriend;
    _(friends)
      .keys()
      .map((key, index) => {
        friends[key].key = key;
        if (index === 0) {
          friends[key].selected = true;
          selectedFriend = friends[key];
        }
      })
      .value();

    this.setState({
      friends,
      selectedFriend
    });
  }


  /**
   * @param {object} msg
   * @return {void}
   * @memberof ChatStore
   */
  @bind(Actions.messageReceived)
  messageReceived(msg) {
    if (this.state.messages[msg.key]) {
      return;
    }

    this.state.messages[msg.key] = msg;

    this.setState({
      messages: this.state.messages
    });
  }

  /**
   * @param {object} chan
   * @return {void}
   * @memberof ChatStore
   */
  @bind(Actions.channelReceived)
  channelReceived(chan) {
    if (this.state.channels[chan.key]) {
      return;
    }

    this.state.channels[chan.key] = chan;

    this.setState({
      channels: this.state.channels
    });
  }

  /**
   * @param {object} selectedChannel
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.channelOpened)
  channelOpened(selectedChannel) {
    _(this.state.channels)
      .values()
      .map((channel) => {
        channel.selected = false;
      })
      .value();

    selectedChannel.selected = true;
    this.setState({
      selectedChannel,
      channels: this.state.channels
    });
    setTimeout(this.getInstance().getMessages, 100);
  }

  /**
   * @param {object} selectedFriend
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.FriendOpened)
  FriendOpened(selectedFriend) {
    _(this.state.friends)
      .values()
      .map((friends) => {
        friends.selected = false;
      })
      .value();

    selectedFriend.selected = true;

    this.setState({
      selectedFriend,
      friends: this.state.friends
    });
  }

  
  /**
   * @param {void}
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.messagesLoading)
  messagesLoading() {
    this.setState({
      messagesLoading: true
    });
  }

  /**
   * @param {object} messages
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.messagesReceived)
  receivedMessages(messages) {
    _(messages)
      .keys()
      .map((k) => {
        messages[k].key = k;
      })
      .value();

    this.setState({
      messages,
      messagesLoading: false
    });
  }

  /**
   * @param {object} message
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.sendMessage)
  sendMessage(message) {
    this.state.message = message;
    setTimeout(this.getInstance().sendMessage, 10);
  }

  /**
   * @param {object} channel
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.addChannel)
  addChannel(channel) {
    this.state.channel = channel;
    setTimeout(this.getInstance().addChannel, 10);
  }

  /**
   * @param {object} channels
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.channelsReceived)
  receivedChannels(channels) {
    let selectedChannel;
    _(channels)
      .keys()
      .map((key, index) => {
        channels[key].key = key;
        if (index === 0) {
          channels[key].selected = true;
          selectedChannel = channels[key];
        }
      })
      .value();

    this.setState({
      channels,
      selectedChannel
    });

    setTimeout(this.getInstance().getMessages, 100);
  }

  /**
   * @param {object} user
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.login)
  login(user){
    this.setState({ user });
  }

  /**
   * @param {object} user
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.resendUser)
  resendUser(user) {
    this.setState({
      user
    });
    setTimeout(this.getInstance().getChannels(user), 10);
  }

  /**
   * @param {object} user
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.loginWithEmail)
  loginWithEmail(user) {
    this.setState({
      user
    });
  }

  /**=
   * @param {object} user
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.createUserWithEmailAndPassword)
  createUserWithEmailAndPassword(user) {
    this.setState({
      user
    });
    setTimeout(this.getInstance().addUser1, 10);
  }

  /**
   * @param {object} number
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.phoneNumber)
  phoneNumber(number) {
    this.setState({ number });
    setTimeout(this.getInstance().addUser, 10);
  }

  /**
   * @param {object} userDetails
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.editDetails)
  editDetails(userDetails) {
    this.setState({ userDetails });
    setTimeout(this.getInstance().editUserDetails, 10);
  }

  /**
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.userAddSuccess)
  userAddSuccess() {
    setTimeout(this.getInstance().homepage, 10);
  }

  /**
   * @param {object} number
   * @memberof ChatStore
   * @return {void}
   */
  @bind(Actions.addToFriends)
  addToFriends(number) {
    setTimeout(this.getInstance().getFriends, 10)
  }
}

export default alt.createStore(ChatStore);

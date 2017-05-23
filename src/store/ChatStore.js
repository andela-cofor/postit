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
   * @param {any} friends
   * @memberof ChatStore
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
    // setTimeout(this.getInstance().getMessages, 100);
  }


  /**
   * @param {any} msg
   * @returns null
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
   * @param {any} chan
   * @returns null
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
   * @param {any} selectedChannel
   * @memberof ChatStore
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
    console.log(selectedChannel);
    this.setState({
      selectedChannel,
      channels: this.state.channels
    });
    // console.log(this.state, 'Emma');
    setTimeout(this.getInstance().getMessages, 100);
  }

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

      // setTimeout(this.getInstance().getMessages, 100);
  }

  /**
   * @memberof ChatStore
   */
  @bind(Actions.messagesLoading)
  messagesLoading() {
    this.setState({
      messagesLoading: true
    });
  }

  /**
   * @param {any} messages
   * @memberof ChatStore
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
   * @param {any} message
   * @memberof ChatStore
   */
  @bind(Actions.sendMessage)
  sendMessage(message) {
    this.state.message = message;
    setTimeout(this.getInstance().sendMessage, 10);
  }

  /**
   * @param {any} channel
   * @memberof ChatStore
   */
  @bind(Actions.addChannel)
  addChannel(channel) {
    this.state.channel = channel;
    setTimeout(this.getInstance().addChannel, 10);
  }

  /**
   * @param {any} channels
   * @memberof ChatStore
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
   * @param {any} user
   * @memberof ChatStore
   */
  @bind(Actions.login)
  login(user){
    this.setState({ user });
  }

  /**
   * @param {any} user
   * @memberof ChatStore
   */
  @bind(Actions.resendUser)
  resendUser(user) {
    this.setState({
      user
    });
    setTimeout(this.getInstance().getChannels(user), 10);
  }

  /**
   * @param {any} user
   * @memberof ChatStore
   */
  @bind(Actions.loginWithEmail)
  loginWithEmail(user) {
    this.setState({
      user
    });
  }

  /**=
   * @param {any} user
   * @memberof ChatStore
   */
  @bind(Actions.createUserWithEmailAndPassword)
  createUserWithEmailAndPassword(user) {
    this.setState({
      user
    });
    setTimeout(this.getInstance().addUser1, 10);
  }

  /**
   * @param {any} number
   * @memberof ChatStore
   */
  @bind(Actions.phoneNumber)
  phoneNumber(number) {
    this.setState({ number });
    setTimeout(this.getInstance().addUser, 10);
  }

  /**
   * @param {any} userDetails
   * @memberof ChatStore
   */
  @bind(Actions.editDetails)
  editDetails(userDetails) {
    this.setState({ userDetails });
    setTimeout(this.getInstance().editUserDetails, 10);
  }

  /**
   * @memberof ChatStore
   */
  @bind(Actions.userAddSuccess)
  userAddSuccess() {
    setTimeout(this.getInstance().homepage, 10);
  }

  /**
   * @param {any} number
   * @memberof ChatStore
   */
  @bind(Actions.addToFriends)
  addToFriends(number) {
    console.log('I am in store now', number);
  }
}

export default alt.createStore(ChatStore);

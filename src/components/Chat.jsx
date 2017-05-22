import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import FriendList from './FriendList.jsx';
import MessageBox from './MessageBox.jsx';
import ChatStore from '../store/ChatStore';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import connectToStores from 'alt-utils/lib/connectToStores' 
import trim from 'trim';
import Actions from '../actions/index'
import RaisedButton from 'material-ui/RaisedButton';

@connectToStores
class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        channel: '',
        emailDetails:{
          email: '',
          channelName: ''
        }
    }
    this.onChange=this.onChange.bind(this);
    this.onKeyUp=this.onKeyUp.bind(this);
    this.onClick=this.onClick.bind(this);
    this.loginPage=this.loginPage.bind(this);
    this.addAFriend=this.addAFriend.bind(this);
    this.logout=this.logout.bind(this);
    this.inviteFriend=this.inviteFriend.bind(this);
  }

  componentDidMount(){
    let state = ChatStore.getState();
    console.log(state, 'Hello world');
    // console.log(state.selectedChannel.name, 'was selectedChannel')
    if(state.user === null){
      if(!JSON.parse(localStorage.getItem('state'))){
        browserHistory.push('/')
      }
      else {
        const user = JSON.parse(localStorage.getItem('state'))
        Actions.resendUser(user);
        console.log(this.state,'was selectedChannel')
      }
    } else{
      console.log(state)
    }
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
    return ChatStore.getState();
  }

  onClick(){
    console.log('On Click works')
    ChatStore.addChannel()
  }

  onChange(evt){
    this.setState({
        channel: evt.target.value
    })
  }

  // onClick(){
  //   console.log('Was called Buya')
  //   browserHistory.push('/profile')
  // }

  loginPage(){
    console.log('Was called Buya');
    browserHistory.push('/profile');
  }

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();

      Actions.addChannel(this.state.channel);  
    
      this.setState({
        channel: ''
      });
    }
  }

  addAFriend(event){
    // event.preventDefault();
    // console.log(event.target.value, 'From user text');
    if(event.keyCode === 13 && trim(event.target.value) != '') {
      event.preventDefault();
      // console.log(event.target.value);
      // this.setState({
      //     channel: event.target.value
      // })
      
      Actions.addToFriends(event.target.value); 
    }
  }

  logout(){
    console.log('Someone clicked me');
    localStorage.clear();
    browserHistory.push('/')
  }

  inviteFriend(event){
    if(event.keyCode === 13 && trim(event.target.value) != '') {
      event.preventDefault();
      const email = event.target.value.trim()
      // console.log(this.state)
      let state = ChatStore.getState();
      console.log(state.selectedChannel.name, 'Hey you were clicked');
      // console.log(email)
      // Actions.addChannel(this.state.channel); 
      this.state = (Object.assign({}, this.state, {
        emailDetails:{
          email: email,
          channelName: state.selectedChannel.name
        }
      }));
      console.log(this.state, 'Have u changed state ?'); 
      Actions.inviteFriendToChannel(this.state.emailDetails);
    }
  }

  render() {
    return(
      
      <div
      iconElementRight={
              <RaisedButton 
                label="Profile" 
                style={{margin: 12,}}
                onClick={this.loginPage}
                 />
            }>
        {/*<FloatingActionButton
        style={{marginLeft: 20, marginTop: 10}}
        onClick={this.onClick}
        >
            <ContentAdd 
              
            />
        </FloatingActionButton>*/}
        <div>
          <RaisedButton
            onClick={this.logout}
            label="Logout"
            style={{
              marginLeft: 1150,
            }}
          />
        </div>
        <div>
        <textarea
          placeholder="Add a group..."
          value={this.state.message}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          style={{
          width: '20%',
          borderColor: '#D0D0D0',
          resize: 'none',
          borderRadius: 3,
          minHeight: 50,
          color: '#555',
          fontSize: 14,
          outline: 'auto 0px',
          marginLeft: 40,
          marginTop: 10
        }} />
        <textarea
          placeholder="Invite friend with email..."
          name="email"
          value={this.state.newUserEmail}
          onKeyUp={this.inviteFriend}
          style={{
          width: '20%',
          borderColor: '#D0D0D0',
          resize: 'none',
          borderRadius: 3,
          minHeight: 50,
          color: '#555',
          fontSize: 14,
          outline: 'auto 0px',
          marginLeft: 218,
          marginTop: 10
        }} />
        <textarea
          type="number"
          placeholder="Add a a friend with number..."
          onKeyUp={this.addAFriend}
          style={{
          width: '20%',
          borderColor: '#D0D0D0',
          resize: 'none',
          borderRadius: 3,
          minHeight: 50,
          color: '#555',
          fontSize: 14,
          outline: 'auto 0px',
          marginLeft: 200,
          marginTop: 10
        }} />
        </div>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: 1200,
          width: '100%',
          margin: '30px auto 30px',
          }}>
          <ChannelList {...this.props}/>
          <MessageList />
          <FriendList />
        </div>
        <MessageBox />
    </div>
    );
  }
  

}

export default Chat;
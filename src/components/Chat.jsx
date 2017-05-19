import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import MessageBox from './MessageBox.jsx';
import ChatStore from '../store/ChatStore';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import connectToStores from 'alt-utils/lib/connectToStores' 
import trim from 'trim';
import Actions from '../actions/index'

@connectToStores
class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        channel: ''
    }
    this.onChange=this.onChange.bind(this)
    this.onKeyUp=this.onKeyUp.bind(this)
    this.onClick=this.onClick.bind(this)
  }

  componentDidMount(){
    let state = ChatStore.getState();
    if(!state.user){
      browserHistory.push('/')
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

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();

      Actions.addChannel(this.state.channel);  
    
      this.setState({
        channel: ''
      })
    }
  }

  render() {
    return(
      <div>
        {/*<FloatingActionButton
        style={{marginLeft: 20, marginTop: 10}}
        onClick={this.onClick}
        >
            <ContentAdd 
              
            />
        </FloatingActionButton>*/}
        <textarea
          placeholder="Add a channel..."
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
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: 1200,
          width: '100%',
          margin: '30px auto 30px',
          }}>
          <ChannelList {...this.props}/>
          <MessageList />
        </div>
        <MessageBox />
    </div>
    );
  }
  

}

export default Chat;
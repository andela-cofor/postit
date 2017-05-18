import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import MessageBox from './MessageBox.jsx';
import ChatStore from '../store/ChatStore';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import connectToStores from 'alt-utils/lib/connectToStores' 

@connectToStores
class Chat extends React.Component {
  constructor(props){
    super(props);
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
    ChatStore.addChannel('Firebase')
  }

  render() {
    return(
      <div>
        <FloatingActionButton
        style={{marginLeft: 20, marginTop: 10}}
        onClick={this.onClick}
        >
            <ContentAdd 
              
            />
        </FloatingActionButton>
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
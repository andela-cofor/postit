import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import MessageBox from './MessageBox.jsx';
import ChatStore from '../store/ChatStore';
import { browserHistory } from 'react-router';

class Chat extends React.Component {
  componentDidMount(){
    let state = ChatStore.getState();
    if(!state.user){
      browserHistory.push('/')
    }
  }
  render() {
    return(
      <div>
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
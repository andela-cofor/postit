import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import connectToStores from 'alt-utils/lib/connectToStores'
import ChatStore from '../store/ChatStore';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var Card = mui;
var List = li

@connectToStores
class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: {}
    }
      
    // firebase.database().ref('/messages/').on('child_added', (msg) => {
    //   // console.log(msg)
    //   if(this.state.messages[msg.key]){
    //       return;
    //   }
    //   let msgVal = msg.val();
    //   msgVal.key = msg.key;
    //   this.state.messages[msgVal.key] = msgVal;
    //   this.setState({messages: this.state.messages})

    //   firebase.database().ref('/messages/').on('child_removed', (msg) => {
    //     var key = msg.key;
    //     delete this.state.messages[key];
    //     this.setState({messages: this.state.messages});
    //   })
    //     // let messagesVal = dataSnapshot.val();
    //     // let messages = _(messagesVal)
    //     //     .keys()
    //     //     .map((messageKey) => {
    //     //         console.log('got here')
    //     //         let cloned = _.clone(messagesVal[messageKey]);
    //     //         cloned.key = messageKey;
    //     //         return cloned;
    //     //     })
    //     //     .value();

    //     // this.setState({
    //     //     messages: messages
    //     // })
    // });
      
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
    return ChatStore.getState();
  }

  render() {
    let messageNodes = null;

    if(!this.props.messagesLoading){
      messageNodes = _.values(this.props.messages).map((message) => {
        return (
            // <Message message={message.message} />
            <Message message={message} />
        );
      });
    } else {
      messageNodes = <CircularProgress
        mode="indeterminate"
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          margin: '0 auto',
          display: 'block',
          width: '60px'
        }}        
      />
    }
    

    return (
        // <div>{messageNodes}</div>
        <div style={{
                flex: 4,
                marginLeft: 30,
            }}>
            <Card >
                <List>
                    {messageNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default MessageList;
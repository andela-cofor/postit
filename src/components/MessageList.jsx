import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import _ from 'lodash';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var Card = mui;
var List = li

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: {}
    }
      
    firebase.database().ref('/messages/').on('child_added', (msg) => {
      // console.log(msg)
      if(this.state.messages[msg.key]){
          return;
      }
      let msgVal = msg.val();
      msgVal.key = msg.key;
      this.state.messages[msgVal.key] = msgVal;
      this.setState({messages: this.state.messages})

      firebase.database().ref('/messages/').on('child_removed', (msg) => {
        var key = msg.key;
        delete this.state.messages[key];
        this.setState({messages: this.state.messages});
      })
        // let messagesVal = dataSnapshot.val();
        // let messages = _(messagesVal)
        //     .keys()
        //     .map((messageKey) => {
        //         console.log('got here')
        //         let cloned = _.clone(messagesVal[messageKey]);
        //         cloned.key = messageKey;
        //         return cloned;
        //     })
        //     .value();

        // this.setState({
        //     messages: messages
        // })
    });
      
  }

  render() {
    var messageNodes = _.values(this.state.messages).map((message) => {
        return (
            <Message message={message.message} />
        );
    });

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
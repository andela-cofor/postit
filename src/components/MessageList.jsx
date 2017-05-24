import React from 'react';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../store/ChatStore';
import Message from './Message.jsx';

require('firebase/auth');
require('firebase/database');

const Card = mui;
const List = li;

/**
 * @class MessageList
 * @extends {React.Component}
 */
@connectToStores
class MessageList extends React.Component {

  static getStores() {
    return [ChatStore];
  }

  static getPropsFromStores() {
    return ChatStore.getState();
  }

  /**
   * Creates an instance of MessageList.
   * @param {any} props
   * @memberof MessageList
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: {}
    };
  }


  /**
   * @returns message
   * @memberof MessageList
   */
  render() {
    let messageNodes = null;

    if (!this.props.messagesLoading) {
      messageNodes = _.values(this.props.messages)
        .map((message) => {
          return (
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
      />;
    }
    return (
        <div
          style={{
            flex: 2,
            marginLeft: 20,
          }}>
            <Card id="messageCard">
                <List>
                    {messageNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default MessageList;

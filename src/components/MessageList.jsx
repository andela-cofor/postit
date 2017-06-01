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

  /**
   * Returns available store
   * @static
   * @returns {object} ChatStore
   * @memberof MessageList
   */
  static getStores() {
    return [ChatStore];
  }


  /**
   * Returns props in the store
   * @static
   * @returns {object} ChatStore
   * @memberof MessageList
   */
  static getPropsFromStores() {
    return ChatStore.getState();
  }

  /**
   * Creates an instance of MessageList.
   * @param {object} props
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
      messageNodes = <CircularProgress className="CircularProgress"
        mode="indeterminate"
      />;
    }
    return (
        <div>
            <Card id="messageCard" className="messageCard">
              <h6 className="center">Group Messages</h6>
                <List>
                    {messageNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default MessageList;

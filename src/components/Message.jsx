import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui';

/**
 * @class Message
 * @extends {React.Component}
 */
class Message extends React.Component {

  /**
   * @returns ListItem
   * @memberof Message
   */
  render() {
    return (
      <ListItem disabled={true}
      leftAvatar={
      <Avatar src={this.props.message.profilePic} />
      } >
          {this.props.message.message}
      </ListItem>
    );
  }
}

export default Message;

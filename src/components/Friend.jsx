import React from 'react';
import { ListItem } from 'material-ui';
/**
 * @class Friend
 * @extends {React.Component}
 */
class Friend extends React.Component {

  /**
   * @returns ListItem of friends
   * @memberof Friend
   */
  render() {
    return (
      <ListItem>{this.props.friend.email}</ListItem>
    );
  }
}

export default Friend;

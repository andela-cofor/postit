import React from 'react';
import { ListItem } from 'material-ui';
import Avatar from 'material-ui/Avatar';
import Actions from '../actions/';

/**
 * @class Channel
 * @extends {React.Component}
 */
class Channel extends React.Component {

  /**
   * Creates an instance of Channel.
   * @param {object} props
   * @memberof Channel
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Monitor Channel clicked
   * @memberof Channel
   * @return {void}
   */
  onClick() {
    Actions.channelOpened(this.props.channel);
  }

  /**
   * @returns ListItem containing list of channels
   * @memberof Channel
   */
  render() {
    return (
    <ListItem
      onClick={this.onClick}>
        {this.props.channel.name}
    </ListItem>
    );
  }
}

export default Channel;

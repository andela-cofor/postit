import React from 'react';
import _ from 'lodash';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../store/ChatStore';
import Channel from './Channel.jsx';

require('firebase/auth');
require('firebase/database');

const Card = mui;
const List = li;

/**
 * @class ChannelList
 * @extends {React.Component}
 */
@connectToStores
class ChannelList extends React.Component {

  /**
   * Creates an instance of ChannelList.
   * @param {object} props
   * @memberof ChannelList
   * @return {void}
   */
  constructor(props) {
    super(props);
    ChatStore.getChannels();
  }

  /**
   * Return the store from chat store
   * @static
   * @returns store
   * @memberof ChannelList
   * @return {void}
   */
  static getStores() {
    return [ChatStore];
  }

  /**
   * Gets props from chat store
   * @static
   * @returns state
   * @memberof ChannelList
   * @return {object}
   */
  static getPropsFromStores() {
    return ChatStore.getState();
  }

  /**
   * @returns ChannelList
   * @memberof ChannelList
   */
  render() {
    if (!this.props.channels) {
      return (
        <Card>
          <CircularProgress className="CircularProgress"
            mode="indeterminate"
          />
        </Card>
      );
    }
    const channelNodes = _(this.props.channels)
      .keys()
      .map((k, index) => {
        const channel = this.props.channels[k];
        return (
            <Channel channel={channel} key={`${channel.key}${index}`} />
        );
      })
      .value();

    return (
        <div>
            <Card id="channelCard" className="channelCard">
              <h6 className="center">Channel List</h6>
                <List>
                    {channelNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default ChannelList;

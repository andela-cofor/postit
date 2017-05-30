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
        <Card style={{
          flexGrow: 1
        }}>
          <CircularProgress
            mode="indeterminate"
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
              margin: '0 auto',
              display: 'block',
              width: '60px'
            }}
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
        <div
          style={{
            flexGrow: 1,
          }}>
            <Card id="channelCard"
            style={{
                overflow: 'scroll',
                height: 200
              }}>
              <h6>Channel List</h6>
                <List>
                    {channelNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default ChannelList;

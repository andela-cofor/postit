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
   * @param {any} props
   * @memberof ChannelList
   */
  constructor(props) {
    super(props);
    ChatStore.getChannels();
  }

  /**
   * @static
   * @returns store
   * @memberof ChannelList
   */
  static getStores() {
    return [ChatStore];
  }

  /**
   * @static
   * @returns state
   * @memberof ChannelList
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
        // <div>{messageNodes}</div>
        <div
          style={{
            flexGrow: 1,
          }}>
            <Card>
                <List>
                    {channelNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default ChannelList;

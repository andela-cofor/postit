import React from 'react';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import connectToStores from 'alt-utils/lib/connectToStores';
import Friend from './Friend.jsx';
import ChatStore from '../store/ChatStore';

const Card = mui;
const List = li;

/**
 * @class FriendList
 * @extends {React.Component}
 */
@connectToStores
class FriendList extends React.Component {

  /**
   * Creates an instance of FriendList.
   * @param {any} props
   * @memberof FriendList
   */
  constructor(props) {
    super(props);
    // ChatStore.getFriends();
  }

  /**
   * @static
   * @returns ChatStore
   * @memberof FriendList
   */
  static getStores() {
    return [ChatStore];
  }


  /**
   * @static
   * @returns state
   * @memberof FriendList
   */
  static getPropsFromStores(){
    return ChatStore.getState();
  }


  /**
   * @returns FriendList
   * @memberof FriendList
   */
  render() {
    if (!this.props.friends) {
      <CircularProgress
        mode="indeterminate"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          margin: '0 auto',
          display: 'block',
          width: '60px'
        }}
      />;
    }

    const FriendNodes = _(this.props.friends)
      .keys()
      .map((k, index) => {
        const friend = this.props.friends[k];
        return (
        <Friend friend={friend} key={`${friend.key}${index}`} />
        );
      })
    .value();

    return (
      <Card
        style={{
          flex: 1,
          marginLeft: 20,
        }}>
        <List>
          {FriendNodes}
        </List>
      </Card>
    );
  }
}

export default FriendList;

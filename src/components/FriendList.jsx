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
   * @param {object} props
   * @memberof FriendList
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns ChatStore containing functions states and props
   * @static
   * @returns ChatStore
   * @memberof FriendList
   */
  static getStores() {
    return [ChatStore];
  }


  /**
   * Returns props in the chat store
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
      <CircularProgress className="CircularProgress"
        mode="indeterminate"
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
      <Card className="FriendCard"
        >
        <h6 className="center">Contact List</h6>
        <List>
          {FriendNodes}
        </List>
      </Card>
    );
  }
}

export default FriendList;

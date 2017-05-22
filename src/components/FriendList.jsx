import React from 'react';
import Friend from './Friend.jsx';
import _ from 'lodash';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import connectToStores from 'alt-utils/lib/connectToStores'
import ChatStore from '../store/ChatStore';
import CircularProgress from 'material-ui/CircularProgress';

let Card = mui;
let List = li

@connectToStores
class FriendList extends React.Component {
  constructor(props){
    super(props)
    ChatStore.getFriends()
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
    return ChatStore.getState();
  }

  render(){
    if(!this.props.friends){
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
    }

    let FriendNodes = _(this.props.friends)
      .keys()
      .map((k, index) => {
        let friend = this.props.friends[k];
      return (
        <Friend friend={friend} key={`${friend.key}${index}`} />
      )
    })
    .value();

    return (
      <Card style={{
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
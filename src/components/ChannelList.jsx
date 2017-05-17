import React from 'react';
import Channel from './Channel.jsx';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import _ from 'lodash';
var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
import trim from 'trim';
import connectToStores from 'alt-utils/lib/connectToStores'
import ChatStore from '../store/ChatStore';
import CircularProgress from 'material-ui/CircularProgress';

let Card = mui;
let List = li


@connectToStores
class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    ChatStore.getChannels()  

      // this.onChange=this.onChange.bind(this)
      // this.onKeyUp=this.onKeyUp.bind(this)

      // firebase.database().ref('/channels/').on('value', (dataSnapshot) => {
      //   let channelsVal = dataSnapshot.val()
      //   let channels = _(channelsVal)
      //     .keys()
      //     .map((channelKey) => {
      //       let cloned = _.clone(channelsVal[channelKey]);
      //       cloned.key = channelKey;
      //       return cloned;
      //     })
      //     .value();


      //   this.setState({
      //     channels: channels
      //   })
      // });
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
    return ChatStore.getState();
  }

  // onChange(evt){
  //     this.setState({
  //         channels: evt.target.value
  //     })
  //     console.log(this.state.channels, 'Channel state')
  // }

  // onKeyUp(evt) {
  //   // console.log(evt.target.value, 'onKeyUp')
  //     if(evt.keyCode === 13 && trim(evt.target.value) != '') {
  //       evt.preventDefault();

  //       firebase.database().ref('/channels/' + name).push({
  //         name: this.state.channels
  //       })
  //       this.setState({
  //         channels: channels
  //       })
  //     }
  // }

  render() {
    if(!this.props.channels){
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
      )
    }
    let channelNodes = _(this.props.channels)
      .keys()
      .map((k, index) => {
        let channel = this.props.channels[k];
        return (
            <Channel channel={channel} key={`${channel.key}${index}`} />
        );
    })
    .value()

    return (
        // <div>{messageNodes}</div>
        <div style={{
                flexGrow: 1,
            }}>
            {/*<textarea
              value={this.state.channels}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
              placeholder="Add a channel"
              value={this.state.message}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
              style={{
              width: '99%',
              borderColor: '#D0D0D0',
              resize: 'none',
              borderRadius: 3,
              minHeight: 50,
              color: '#555',
              fontSize: 14,
              outline: 'auto 0px'
          }} />*/}
            <Card >
                <List>
                    {channelNodes}
                </List>
            </Card>
        </div>
    );
  }
}

export default ChannelList;
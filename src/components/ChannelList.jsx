import React from 'react';
import Channel from './Channel.jsx';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import _ from 'lodash';
var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");

var Card = mui;
var List = li

class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: []
        }

        firebase.database().ref('/channels/').once('value', (dataSnapshot) => {
          let channels = dataSnapshot.val()
          this.setState({
            channels: channels
          })
        });
    }

    render() {
        var channelNodes = this.state.channels.map((channel) => {
          console.log(channel, 'channesls here')
            return (
                <Channel channel={channel.cname} />
            );
        });

        return (
                // <div>{messageNodes}</div>
                <div style={{
                        flexGrow: 1,
                    }}>
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
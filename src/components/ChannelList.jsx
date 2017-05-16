import React from 'react';
import Channel from './Channel.jsx';
import mui from 'material-ui/Card';
import li from 'material-ui/List';

var Card = mui;
var List = li

class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [
                'Lagos-All',
                'Lagos-Fellows'
            ]
        }
    }

    render() {
        var channelNodes = this.state.channels.map((channel) => {
            return (
                <Channel channel={channel} />
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
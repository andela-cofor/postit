import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx'
import MessageBox from './MessageBox.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

var ThemeManager = getMuiTheme;

class App extends React.Component {
    constructor(){
        super();
        ThemeManager({palette: {
            primary1Color: Colors.blue500,
            primary1Color: Colors.blue700,
            primary1Color: Colors.blue100,
            accent1Color: Colors.pink400
        }});
    }

    static childContextTypes() {
        muiTheme: React.PropTypes.object
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="PostIt" />
                    <div style={{
                            display: 'flex',
                            flexFlow: 'row wrap',
                            maxWidth: 1200,
                            width: '100%',
                            margin: '30px auto 30px',
                        }}>
                        <ChannelList />
                        <MessageList />
                    </div>
                    <MessageBox />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

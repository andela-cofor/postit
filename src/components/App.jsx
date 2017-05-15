import React from 'react';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            messages: [
                'hi there how are you',
                'I am fine, and you?'
            ]
        }
    }

    render() {
        var messageNodes = this.state.messages.map((messages) => {
            return (
                <div>{message}</div>
            );
        });

        return (
                <div>{message}</div>
            );
    }
}

export default App;

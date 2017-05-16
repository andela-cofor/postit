import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.jsx';
require('./main.scss');
import '../node_modules/react-materialize/';

ReactDom.render(<App />, document.getElementById('container'));
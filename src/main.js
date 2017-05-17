import React from 'react';
import ReactDom from 'react-dom';
// import App from './components/App.jsx';
// require('./main.scss');
// import '../node_modules/react-materialize/';
require('./main.scss');
import AppRoutes from './routes/AppRoutes'

ReactDom.render(<AppRoutes />, document.getElementById('container'));


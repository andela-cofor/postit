import React from 'react';
import ReactDom from 'react-dom';
import AppRoutes from './routes/AppRoutes';

require('./main.scss');

ReactDom.render(<AppRoutes />, document.getElementById('container'));

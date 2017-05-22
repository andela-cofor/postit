var webpack = require('webpack');
var WebPackDevServer = require ('webpack-dev-server');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./util/helper');
const port = process.env.PORT || 8080;

const app = express();

if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/critical', (req, res) => {
  if (helper.sendSms(req.body.receiver, req.body.channel, req.body.sender, req.body.message)) {
    return res.status(200).json({ message: 'Email sent' });   
  }
  return res.status(400).json({ message: 'Error sending email' });
})

app.post('/api/invite/email', (req, res) => {
  if (helper.sendMail(req.body.receiver, req.body.channel, req.body.sender)) {
    return res.status(200).json({ message: 'Email sent' });   
  }
  return res.status(400).json({ message: 'Error sending email' });
});

app.post('/api/urgent', (req, res) => {
    console.log(req.body);
  if (helper.sendUrgentMail(req.body.receiver, req.body.channel, req.body.sender, req.body.message)) {
    return res.status(200).json({ message: 'Email sent' });   
  }
  return res.status(400).json({ message: 'Error sending email' });
});

app.listen(port, () => {
    console.log(`Started on PORT ${port}`);
});

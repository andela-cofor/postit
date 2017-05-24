import config from './config';

module.exports = {
  'Go to home page': (browser) => {
    browser
    .url(config.url)
    .waitForElementVisible('body')
    .assert.title('PostIt App')
    .end();
  }
};

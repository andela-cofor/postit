import config from './config';

module.exports = {
  'Message Card': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .assert.elementPresent('#submit')
      .setValue('#email', 'for@test.com')
      .setValue('#password', 'netbeans')
      .click('#submit')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
      .assert.elementPresent('#messageCard')
      .end();
  },
};

import config from './config';

module.exports = {
  'Sign up': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#signUp')
      .click('#signUp')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/signup')
      .assert.elementPresent('#firstName')
      .setValue('#firstName', 'chinedu')
      .assert.elementPresent('#lastName')
      .setValue('#lastName', 'ofor')
      .assert.elementPresent('#email')
      .setValue('#email', 'yttt@wwwww.com')
      .assert.elementPresent('#password')
      .setValue('#password', 'netbeans')
      .assert.elementPresent('#phoneNumber')
      .setValue('#phoneNumber', '07030296746')
      .assert.elementPresent('#signup')
      .click('#signup')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
  }
};
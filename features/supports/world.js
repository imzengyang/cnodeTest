require('chromedriver');
let { Builder } = require('selenium-webdriver');
let { defineSupportCode } = require('cucumber');
function CustomWorld() {
    this.driver = new Builder().forBrowser('chrome').build();
}
defineSupportCode(function ({ setWorldConstructor }) {
    setWorldConstructor(CustomWorld);
})
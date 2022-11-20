const webdriver = require("selenium-webdriver");
const browser = require("../../config.json").browser;

class BrowserFactory {
  #driver = new webdriver.Builder().forBrowser(browser).build();
  
  getDriver() {
    return this.#driver;
  }
}

module.exports = new BrowserFactory();

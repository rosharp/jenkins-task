const webdriver = require("selenium-webdriver");
const browser = require("../../config.json").browser;

class BrowserFactory {
  getDriver() {
    function builder() {
      if (browser === "chrome") {
        let options = new chrome.Options();
        return new webdriver.Builder()
          .setChromeOptions(options)
          .forBrowser("chrome")
          .build();
      } else if (browser === "firefox") {
        return new webdriver.Builder()
          .forBrowser("firefox")
          .build();
      } else if (browser === "microsoftEdge") {
        let options = new edge.Options();
        return new webdriver.Builder()
          .setEdgeOptions(options)
          .forBrowser("MicrosoftEdge")
          .setEdgeService(new edge.ServiceBuilder(edgedriver.binPath()))
          .build();
      } else if (browser === "internetExplorer") {
        return new webdriver.Builder()
          .forBrowser('internet explorer')
          .setIEOptions(options)
          .build();
      } else if (browser === "safari") {
        let options = new safari.Options();
        return new webdriver.Builder()
          .forBrowser('safari')
          .setSafariOptions(options)
          .build();
      }
    }

    const driver = builder();
    return driver;
  }
}

module.exports = new BrowserFactory();


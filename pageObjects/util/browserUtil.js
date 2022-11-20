const browserFactory = require("./browserFactory");
const logger = require("../util/logger");
const { By, until } = require("selenium-webdriver");

class BrowserUtil {
  #driver;

  async getDriver() {
    if (this.#driver == null) {
      this.#driver = browserFactory.getDriver();
    }
    return this.#driver;
  }

  clearDriver() {
    logger.logInfo("Driver is null");
    driver == null;
  }

  quitDriver() {
    logger.logInfo("Driver is null");
    driver == null;
    logger.logInfo("Quit driver");
    driver.quit();
  }

  maximizeWindow() {
    logger.logInfo("Maximize window");
    driver.manage().window().maximize();
  }

  async goToUrl(url) {
    logger.logInfo(`Open URL: ${url}`);
    await driver.get(url);
  }

  async getCurrentUrl() {
    let currentUrl = await driver.getCurrentUrl();
    logger.logInfo(`Current URL is: ${currentUrl}`);
    return currentUrl;
  }

  async closeAlert() {
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    logger.logInfo("Close alert");
    await alert.accept();
  }

  async isAlertPresent() {
    try {
      await driver.switchTo().alert();
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAlertText() {
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    return alertText;
  }

  async confirmAlert() {
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    logger.logInfo("Confirm alert");
    await alert.dismiss();
  }

  async prompt(text) {
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    await alert.sendKeys(text);
    logger.logInfo("Send keys and accept");
    await alert.accept();
  }

  async switchToFrame(frame) {
    const iframe = By.xpath(`//iframe[@id='${frame}']`);
    await driver.wait(until.elementLocated(iframe));
    logger.logInfo(`Switch to frame: ${frame}`);
    await driver.switchTo().frame(frame);
  }

  async switchToChildFrame() {
    logger.logInfo("Switch to child frame");
    await driver.switchTo().frame(0);
  }

  async switchToDefaultContent() {
    logger.logInfo("Switch to default content");
    await driver.switchTo().defaultContent();
  }

  async openNewTabAndSwitch() {
    const originalWindow = await driver.getWindowHandle();
    await driver.wait(
      async () => (await driver.getAllWindowHandles()).length === 2
    );
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async (handle) => {
      if (handle !== originalWindow) {
        await driver.switchTo().window(handle);
      }
    });
    await driver.switchTo().window(originalWindow);
  }

  async switchToNewTabAndClose() {
    const originalWindow = await driver.getWindowHandle();
    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2);
    const windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[1]);
    await driver.close();
    await driver.switchTo().window(originalWindow);
  }
}

module.exports = new BrowserUtil();


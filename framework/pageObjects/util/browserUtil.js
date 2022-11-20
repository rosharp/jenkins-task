const browserFactory = require("./browserFactory");
const { until } = require("selenium-webdriver");

class BrowserUtil {
  #driver = browserFactory.getDriver();

  getDriver() {
    return this.#driver;
  }

  maximizeWindow() {
    driver.manage().window().maximize();
  }

  async goToUrl(url) {
    await driver.get(url);
  }

  async checkCurrentUrl(url) {
    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl === url) {
      return true;
    } else false;
  }

  async closeAlert() {
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
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
    let alertText = await alert.getText();
    await alert.dismiss();
  }

  async randomPrompt() {
    let r = (Math.random() + 1).toString(36).substring(7);
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    await alert.sendKeys(r);
    let alertText = await alert.getText();
    await alert.accept();
    return r;
  }

  async openNewTabAndSwitch(element) {
    const originalWindow = await driver.getWindowHandle();
    await element.click();
    await driver.wait(
      async () => (await driver.getAllWindowHandles()).length === 2,
      10000
    );
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async (handle) => {
      if (handle !== originalWindow) {
        await driver.switchTo().window(handle);
      }
    });
    await driver.switchTo().window(originalWindow);
  }

  async switchToNewTabAndClose(element) {
    const originalWindow = await driver.getWindowHandle();
    await element.click();
    await driver.wait(
      async () => (await driver.getAllWindowHandles()).length === 2,
      10000
    );
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async (handle) => {
      if (handle !== originalWindow) {
        await driver.switchTo().window(handle);
      }
    });
    // await driver.close();
    await driver.switchTo().window(originalWindow);
  }
}

module.exports = new BrowserUtil();

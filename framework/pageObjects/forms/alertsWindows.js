const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("./../elements/label");
const Button = require("./../elements/button");
const browserUtil = require("./../util/browserUtil");

class AlertsWindows extends BaseForm {
  driver = browserUtil.getDriver();
 
  #confirmBtn = By.xpath("//button[@id='confirmButton']");
  #prompt = By.xpath("//button[@id='promtButton']");
  #promptResult = By.xpath("//span[@id='promptResult']");
  clickAlert = By.xpath("//button[@id='alertButton']");

  #confirmBox = new Button(this.#confirmBtn, "button");
  #promptBtn = new Button(this.#prompt, "button");
  #promptResLabel = new Label(this.#promptResult, "label");
  #clickAlertBtn = new Button(this.clickAlert, "button");

  #lastWord = new RegExp(/\b(\w+)$/);

  constructor() {
    super(new Button(By.xpath("//button[@id='alertButton']"), "button"));
  }

  async clickAlertBtn() {
    await driver.wait(until.elementLocated(this.clickAlert));
    this.#clickAlertBtn.click();
  }

  async clickConfirmBoxBtn() {
    await driver.wait(until.elementLocated(this.#confirmBtn));
    this.#confirmBox.click();
  }

  async clickPromptBtn() {
    await driver.wait(until.elementLocated(this.#prompt));
    this.#promptBtn.click();
  }

  async getRes() {
    await driver.wait(until.elementLocated(this.#promptResult));
    let resText = await this.#promptResLabel.getText();
    let res = this.#lastWord.exec(resText)[0];
    return res;
  }
}

module.exports = new AlertsWindows();

const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("./../elements/label");
const Button = require("./../elements/button");

class AlertsWindows extends BaseForm {

  #confirmBox = new Button(By.xpath("//button[@id='confirmButton']"), "confirm button");
  #promptBtn = new Button(By.xpath("//button[@id='promtButton']"), "prompt button");
  #promptResLabel = new Label(By.xpath("//span[@id='promptResult']"), "prompt result label");
  #clickAlertBtn = new Button(By.xpath("//button[@id='alertButton']"), "alert button");

  #lastWord = new RegExp(/\b(\w+)$/);

  constructor() {
    super(new Label(By.xpath("//div[@id='Ad.Plus-728x90']"), "select an item label"));
  }

  async clickAlertBtn() {
    await this.#clickAlertBtn.waitUntilLocated();
    this.#clickAlertBtn.click();
  }

  async clickConfirmBoxBtn() {
    await this.#confirmBox.waitUntilLocated();
    this.#confirmBox.click();
  }

  async clickPromptBtn() {
    await this.#promptBtn.waitUntilLocated();
    this.#promptBtn.click();
  }

  async getRes() {
    await this.#promptResLabel.waitUntilLocated();
    let resText = await this.#promptResLabel.getText();
    let res = this.#lastWord.exec(resText)[0];
    return res;
  }
}

module.exports = new AlertsWindows();


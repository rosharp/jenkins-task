const { By } = require("selenium-webdriver");
const Button = require("../elements/button");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");

class Homepage extends BaseForm {

  getButton(btnName) {
    const template = By.xpath(`//div[@class='card-body']//h5[contains(text(), '${btnName}')]`);
    return template;
  }

  #alertBtn = new Button(this.getButton("Alerts"), "alert button");
  #elementsBtn = new Button(this.getButton("Elements"), "elements button");

  constructor() {
    super(new Label(By.xpath("//div[@class='category-cards']"), "label"));
  }

  clickAlerts() {
    this.#alertBtn.click();
  }

  clickElements() {
    this.#elementsBtn.click();
  }
}

module.exports = new Homepage();


const { By } = require("selenium-webdriver");
const Button = require("../elements/button");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");

class Homepage extends BaseForm {
  #alert = By.xpath("//div[@class='card-body']//h5[contains(text(), 'Alerts')]");
  #elements = By.xpath("//div[@class='card-body']//h5[contains(text(), 'Elements')]");

  #alertBtn = new Button(this.#alert, "button");
  #elementsBtn = new Button(this.#elements, "button");

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

const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const browserUtil = require("../util/browserUtil");

class SidebarForm extends BaseForm {
  driver = browserUtil.getDriver();

  #alert = By.xpath("//span[@class='text'][contains(text(), 'Alerts')]");
  #nestedFrames = By.xpath(
    "//span[@class='text'][contains(text(), 'Nested Frames')]"
  );

  #frames = By.xpath("//span[@class='text'][contains(text(), 'Frames')]");
  #webTables = By.xpath("//li[@id='item-3']//span[contains(text(), 'Web Tables')]");
  #browserWindows = By.xpath("//li[@id='item-0']//span[@class='text' and contains(text(), 'Browser Windows')]");
  #elements = By.xpath("//div[@class='header-text' and contains(text(), 'Elements')]");
  #links = By.xpath("//li[@id='item-5']");

  #alertLabel = new Label(this.#alert, "label");
  #nestedFramesLabel = new Label(this.#nestedFrames, "label");
  #framesLabel = new Label(this.#frames, "label");
  #webTablesLabel = new Label(this.#webTables, "label");
  #browserWindowsLabel = new Label(this.#browserWindows, "label");
  #elementsLabel = new Label(this.#elements, "label");
  #linksLabel = new Label(this.#links, "label");

  constructor() {
    super(new Label(By.xpath("//div[@class='left-pannel']"), "label"));
  }

  async clickAlertLabel() {
    await driver.wait(until.elementLocated(this.#alert));
    this.#alertLabel.click();
  }

  async clickNestedFrames() {
    await driver.wait(until.elementLocated(this.#nestedFrames));
    this.#nestedFramesLabel.click();
  }

  async clickFrames() {
    await driver.wait(until.elementLocated(this.#frames));
    this.#framesLabel.click();
  }

  async clickWebTables() {
    await driver.wait(until.elementLocated(this.#webTables));
    this.#webTablesLabel.click();
  }

  async clickBrowserWindows() {
    await driver.wait(until.elementLocated(this.#browserWindows));
    this.#browserWindowsLabel.click();
  }

  async clickElementsLabel() {
    await driver.wait(until.elementLocated(this.#elements));
    this.#elementsLabel.click();
  }
  
  async clickLinksLabel() {
    await driver.wait(until.elementLocated(this.#links));
    this.#linksLabel.click();
  }
}

module.exports = new SidebarForm();

const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");

class SidebarForm extends BaseForm {
  #alertLabel = new Label(By.xpath("//span[@class='text'][contains(text(), 'Alerts')]"), "alert label");
  #nestedFramesLabel = new Label(By.xpath("//span[@class='text'][contains(text(), 'Nested Frames')]"), "nested frames label");
  #framesLabel = new Label(By.xpath("//span[@class='text'][contains(text(), 'Frames')]"), "frames label");
  #webTablesLabel = new Label(By.xpath("//li[@id='item-3']//span[contains(text(), 'Web Tables')]"), "web tables label");
  #browserWindowsLabel = new Label(By.xpath("//li[@id='item-0']//span[@class='text' and contains(text(), 'Browser Windows')]"), "elements label");
  #elementsLabel = new Label(By.xpath("//div[@class='header-text' and contains(text(), 'Elements')]"), "links label");
  #linksLabel = new Label(By.xpath("//li[@id='item-5']"), "label");

  constructor() {
    super(new Label(By.xpath("//div[@class='left-pannel']"), "label"));
  }

  async clickAlertLabel() {
    await this.#alertLabel.waitUntilLocated();
    this.#alertLabel.click();
  }

  async clickNestedFrames() {
    await this.#nestedFramesLabel.waitUntilLocated();
    this.#nestedFramesLabel.click();
  }

  async clickFrames() {
    await this.#framesLabel.waitUntilLocated();
    this.#framesLabel.click();
  }

  async clickWebTables() {
    await this.#webTablesLabel.waitUntilLocated();
    this.#webTablesLabel.click();
  }

  async clickBrowserWindows() {
    await this.#browserWindowsLabel.waitUntilLocated();
    this.#browserWindowsLabel.click();
  }

  async clickElementsLabel() {
    await this.#elementsLabel.waitUntilLocated();
    this.#elementsLabel.click();
  }

  async clickLinksLabel() {
    await this.#linksLabel.waitUntilLocated();
    this.#linksLabel.click();
  }
}

module.exports = new SidebarForm();


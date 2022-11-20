const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const browserUtil = require("../util/browserUtil");

class nestedFramesForm extends BaseForm {
    driver = browserUtil.getDriver();
  
    constructor() {
      super(new Label(By.xpath("//div[@class='left-pannel']"), "label"));
    }
    
    async getNestedFramesText(parent, child) {
        const parentFrame = await driver.findElement(By.xpath(`//iframe[@id='${parent}']`));
        await driver.wait(until.elementLocated(parentFrame));
        await driver.switchTo().frame(parent);
        const parentBody = await driver.findElement(By.tagName("body"));
        const parentText = await parentBody.getText();
        const childFrame = await driver.findElement(By.xpath(`//iframe[@id='${child}']`));
        await driver.switchTo().frame(child);
        const childBody = await driver.findElement(By.tagName("body"));
        const childText = await childBody.getText();
        await driver.switchTo().defaultContent();
        return (parentText, childText);
      }
  }
  
  module.exports = new nestedFramesForm();
  
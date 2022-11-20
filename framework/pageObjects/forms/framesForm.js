const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const browserUtil = require("../util/browserUtil");

class FramesForm extends BaseForm {
    driver = browserUtil.getDriver();

    #sampleHeading = By.xpath("//h1[@id='sampleHeading']")
  
    constructor() {
      super(new Label(By.xpath("//div[@class='left-pannel']"), "label"));
    }
    
    async getFrameH1Text(frame) {
        const iframe = By.xpath(`//iframe[@id='${frame}']`);
        await driver.wait(until.elementLocated(iframe))
        await driver.switchTo().frame(frame);
        const sampleHeading = await driver.findElement(this.#sampleHeading);
        const sampleText = await sampleHeading.getText();
        await driver.switchTo().defaultContent();
        return sampleText;
      }
  }
  
  module.exports = new FramesForm();
  
const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const browserUtil = require("../util/browserUtil");

class FramesForm extends BaseForm {
    #sampleHeading = new Label(By.xpath("//h1[@id='sampleHeading']"), "sample heading label");

    constructor() {
        super(new Label(By.xpath("//div[@class='left-pannel']"), "label"));
    }

    async getFrameH1Text(frame) {
        await browserUtil.switchToFrame(frame);
        const sampleText = await this.#sampleHeading.getText();
        await browserUtil.switchToDefaultContent();
        return sampleText;
    }
}

module.exports = new FramesForm();


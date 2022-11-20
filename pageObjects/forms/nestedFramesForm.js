const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const browserUtil = require("../util/browserUtil");

class nestedFramesForm extends BaseForm {
    #childX = By.xpath("//iframe[@srcdoc='<p>Child Iframe</p>']");
    #frameText = new Label(By.tagName("body"), "frame text");
    #child = new Label(this.#childX, "child frame");

    constructor() {
        super(new Label(By.xpath("//div[@id='frame1Wrapper']"), "frame1 wrapper"));
    }

    async getFrameText() {
        await this.#frameText.waitUntilLocated();
        const frameText = await this.#frameText.getText();
        return frameText;
    }

    async switchToChild() {
        await this.#child.waitUntilLocated();
        await browserUtil.switchToChildFrame();
    }
}

module.exports = new nestedFramesForm();


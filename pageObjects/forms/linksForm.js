const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");


class LinksForm extends BaseForm {
    #homeLabel = new Label(By.xpath("//a[@id='simpleLink']"), "label");

    constructor() {
        super(new Label(By.xpath("//a[@id='simpleLink']"), "label"));
    }

    async clickHome() {
        await this.#homeLabel.waitUntilLocated();
        this.#homeLabel.click();
    }
}

module.exports = new LinksForm();


const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const Button = require("../elements/button");


class BrowserWindowsForm extends BaseForm {
    #newTabBtn = new Button(By.xpath("//button[@id='tabButton']"), "new tab button");

    constructor() {
        super(new Label(By.xpath("//button[@id='tabButton']"), "button"));
    }

    async clickNewTabBtn() {
        await this.#newTabBtn.waitUntilLocated();
        this.#newTabBtn.click();
    }
}

module.exports = new BrowserWindowsForm();


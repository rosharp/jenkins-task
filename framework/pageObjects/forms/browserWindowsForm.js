const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const Button = require("../elements/button");
const browserUtil = require("../util/browserUtil");


class BrowserWindowsForm extends BaseForm {
    driver = browserUtil.getDriver();

    #newTab = By.xpath("//button[@id='tabButton']");

    #newTabBtn = new Button(this.#newTab, "button");

    constructor() {
        super(new Label(By.xpath("//button[@id='tabButton']"), "button"));
    }

    async clickNewTabBtn() {
        await driver.wait(until.elementLocated(this.#newTab));
        await browserUtil.switchToNewTabAndClose(this.#newTabBtn);
    }
}

module.exports = new BrowserWindowsForm();

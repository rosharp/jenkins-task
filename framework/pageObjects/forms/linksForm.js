const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const browserUtil = require("../util/browserUtil");


class LinksForm extends BaseForm {
    driver = browserUtil.getDriver();

    #home = By.xpath("//a[@id='simpleLink']");

    #homeLabel = new Label(this.#home, "label");

    constructor() {
        super(new Label(By.xpath("//a[@id='simpleLink']"), "label"));
    }

    async clickHome() {
        await driver.wait(until.elementLocated(this.#home));
        browserUtil.openNewTabAndSwitch(this.#homeLabel);
    }

}

module.exports = new LinksForm();

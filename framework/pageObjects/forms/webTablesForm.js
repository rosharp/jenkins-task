const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Button = require("../elements/button");
const browserUtil = require("../util/browserUtil");

class WebTablesForm extends BaseForm {
    driver = browserUtil.getDriver();

    constructor() {
        super(new Button(By.xpath("//button[@id='addNewRecordButton']"), "button"));
    }

    #add = By.xpath("//button[@id='addNewRecordButton']");

    #addBtn = new Button(this.#add, "button");

    async clickAddBtn() {
        await driver.wait(until.elementLocated(this.#add));
        this.#addBtn.click();
    }


}

module.exports = new WebTablesForm();

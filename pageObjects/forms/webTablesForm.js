const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Button = require("../elements/button");

class WebTablesForm extends BaseForm {
    #addBtn = new Button(By.xpath("//button[@id='addNewRecordButton']"), "add button");

    constructor() {
        super(new Button(By.xpath("//button[@id='addNewRecordButton']"), "button"));
    }

    async clickAddBtn() {
        await this.#addBtn.waitUntilLocated();
        this.#addBtn.click();
    }
}

module.exports = new WebTablesForm();


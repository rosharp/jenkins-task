const { By } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const Button = require("../elements/button");
const Input = require("../elements/input");

class RegistrationForm extends BaseForm {
    #tableRow = new Input(By.xpath("//div[@class='rt-tr -even' or @class='rt-tr -odd']"), "table row");
    #firstName = new Input(By.xpath("//input[@id='firstName']"), "firstname input");
    #lastName = new Input(By.xpath("//input[@id='lastName']"), "lastname input");
    #email = new Input(By.xpath("//input[@id='userEmail']"), "email input");
    #age = new Input(By.xpath("//input[@id='age']"), "age input");
    #salary = new Input(By.xpath("//input[@id='salary']"), "salary input");
    #department = new Input(By.xpath("//input[@id='department']"), "department input");
    #submitBtn = new Button(By.xpath("//button[@id='submit']"), "submit button");

    constructor() {
        super(new Label(By.xpath("//label[@id='firstName-label']", "firstname label")));
    }

    async fillForm(data) {
        await this.#tableRow.waitUntilLocated();
        await this.#firstName.sendKeys(data.firstName);
        await this.#lastName.sendKeys(data.lastName);
        await this.#email.sendKeys(data.email);
        await this.#age.sendKeys(data.age);
        await this.#salary.sendKeys(data.salary);
        await this.#department.sendKeys(data.department);
    }

    async clickSubmit() {
        await this.#submitBtn.waitUntilLocated();
        this.#submitBtn.click();
    }

    async getCountRows() {
        await this.#tableRow.waitUntilLocated();
        const rowEntries = await this.#tableRow.findElements();
        return rowEntries.length;
    }

    async getRowData(rowNum) {
        let data = [];
        const row = new Label(By.xpath(`//div[@class='rt-tr-group'][${rowNum}]//div[@class='rt-td']`), "user row");
        await this.#tableRow.waitUntilLocated();
        const rowEntries = await row.findElements();
        for (let e of rowEntries) {
            data.push(await e.getText());
        }
        return data;
    }

    async deleteLastEntry() {
        let rows = await this.getCountRows();
        const deleteBtn = new Button(By.xpath(`//span[@id='delete-record-${rows}']`), "delete button");
        await deleteBtn.waitUntilLocated();
        deleteBtn.click();
    }

    async findUserByEmail(email) {
        const usr = new Label(By.xpath(`//div[@class='rt-td' and contains(text(), '${email}')]`), "email label");
        const userRow = await usr.findElements();
        if (userRow.length > 0) {
            return true;
        } else return false;
    }
}

module.exports = new RegistrationForm();


const { By, until } = require("selenium-webdriver");
const BaseForm = require("./baseForm");
const Label = require("../elements/label");
const Button = require("../elements/button");
const Input = require("../elements/input");
const browserUtil = require("../util/browserUtil");

class RegistrationForm extends BaseForm {
    driver = browserUtil.getDriver();
    #tableRow = By.xpath("//div[@class='rt-tr-group']");
    #firstNameX = By.xpath("//input[@id='firstName']");
    #lastNameX = By.xpath("//input[@id='lastName']");
    #emailX = By.xpath("//input[@id='userEmail']");
    #ageX = By.xpath("//input[@id='age']");
    #salaryX = By.xpath("//input[@id='salary']");
    #departmentX = By.xpath("//input[@id='department']");
    #submitBtnX = By.xpath("//button[@id='submit']");
    
    #firstName = new Input(this.#firstNameX, "input");
    #lastName = new Input(this.#lastNameX, "input");
    #email = new Input(this.#emailX, "input");
    #age = new Input(this.#ageX, "input");
    #salary = new Input(this.#salaryX, "input");
    #department = new Input(this.#departmentX, "input");
    #submitBtn = new Button(this.#submitBtnX, "button");

    constructor() {
        super(new Label(By.xpath("//div[@id='registration-form-modal']", "label")));
    }

    async fillForm(data) {
        await driver.wait(until.elementLocated(this.#firstNameX));        
        this.#firstName.sendKeys(data.firstName);
        this.#lastName.sendKeys(data.lastName);
        this.#email.sendKeys(data.email);
        this.#age.sendKeys(data.age);
        this.#salary.sendKeys(data.salary);
        this.#department.sendKeys(data.department);
    }

    async clickSubmit() {
        await driver.wait(until.elementLocated(this.#submitBtnX));
        this.#submitBtn.click();
    }

    async countRows() {
        let rows = 0;
        await driver.wait(until.elementLocated(this.#tableRow));
        const rowEntries = await driver.findElements(By.xpath("//div[@class='rt-tr -even' or @class='rt-tr -odd']"));
        for (let e of rowEntries) {
            rows++;
        }
        return rows;
    }

    async getRowData(rowNum) {
        let data = [];
        await driver.wait(until.elementLocated(this.#tableRow));
        const rowEntries = await driver.findElements(By.xpath(`//div[@class='rt-tr-group'][${rowNum}]//div[@class='rt-td']`));
        for (let e of rowEntries) {
            data.push(await e.getText());
        }
        browserUtil.move(data, 2, 3)
        return data;
    }

    async deleteLastEntry() {
        let rows = await this.countRows();
        const deleteBtn = new Button(By.xpath(`//span[@id='delete-record-${rows}']`), "button")
        await driver.wait(until.elementLocated(By.xpath(`//span[@id='delete-record-${rows}']`)));
        deleteBtn.click();
    }

    async findUserByEmail(email) {
        console.log(email)
        const usr = By.xpath(`//div[@class='rt-td' and contains(text(), '${email}')]`)
        if (driver.findElement(usr)) {
            return true;
        } else return false; 
    }
}

module.exports = new RegistrationForm();

const { until, By } = require("selenium-webdriver");
const browserUtil = require("../util/browserUtil");

class BaseElement {
    #driver = browserUtil.getDriver();
    #locator;
    #name;

    constructor(locator, name) {
        this.#locator = locator;
        this.#name = name;
    }

    getText() {
        let el = this.#driver.findElement(this.#locator);
        return el.getText();
    };

    click() {
        let el = this.#driver.findElement(this.#locator);
        el.click();
    }

    sendKeys(keys) {
        let el = this.#driver.findElement(this.#locator);
        el.sendKeys(keys);
    }

    isLoaded() {
        let el = this.#driver.findElement(this.#locator);
        if (el) {
            return true;
        } else return false;
    }
}

module.exports = BaseElement;

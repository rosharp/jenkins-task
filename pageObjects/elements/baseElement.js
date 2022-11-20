const { until } = require("selenium-webdriver");
const logger = require("../util/logger");

class BaseElement {
    #locator;
    #name;

    constructor(locator, name) {
        this.#locator = locator;
        this.#name = name;
    }

    async waitUntilLocated() {
        await driver.wait(until.elementLocated(this.#locator));
    }

    async findElement() {
        const el = await driver.findElement(this.#locator);
        return el;
    }

    async findElements() {
        const elements = await driver.findElements(this.#locator);
        return elements;
    }

    async getText() {
        const el = await driver.findElement(this.#locator);
        return el.getText();
    };

    async click() {
        const el = await driver.findElement(this.#locator);
        el.click();
        logger.logInfo(`Clicked ${this.#name}`);
    }

    async isLoaded() {
        await driver.wait(until.elementLocated(this.#locator));
        const el = await driver.findElements(this.#locator);
        if (el.length > 0) {
            return true;
        } else return false;
    }
}

module.exports = BaseElement;


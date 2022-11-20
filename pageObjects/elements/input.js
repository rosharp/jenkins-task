const BaseElement = require("./baseElement");
const logger = require("../util/logger");
const { until } = require("selenium-webdriver");

class Input extends BaseElement {
    constructor(locator, name) {
        super(locator, name)
        this.locator = locator;
        this.name = name;
    }

    async sendKeys(keys) {
        const el = await driver.findElement(this.locator);
        await driver.wait(until.elementLocated(this.locator))
        el.sendKeys(keys);
        logger.logInfo(`Send keys to ${this.name}`)
    }
}

module.exports = Input;

const BaseElement = require("./baseElement");

class Input extends BaseElement {
    constructor(locator, name) {
        super(locator, name)
    }
}

module.exports = Input;

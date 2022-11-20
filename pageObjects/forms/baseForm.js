class BaseForm {
    #uniqueElement
    #name

    constructor(uniqueEl, name) {
        this.#uniqueElement = uniqueEl;
        this.#name = name;
    }

    async isPageOpen() {
        return this.#uniqueElement.isLoaded();
    }
}

module.exports = BaseForm;


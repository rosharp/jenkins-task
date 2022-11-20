const config = require("../../config.json");
const data = require("../../data.json");

class ConfigMaganer {
    getConfigData(key) {
        return config.key;
    }
    getTestData(key) {
        return data.key;
    }
}

module.exports = new ConfigMaganer();

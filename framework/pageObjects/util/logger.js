const log4js = require("log4js");

const logger = log4js.getLogger();
logger.level = "debug"; 

class Logger {
    logInfo(msg) {
        logger.info(msg);
    }
    logError(msg) {
        logger.error(msg);
    }
}

module.exports = new Logger();

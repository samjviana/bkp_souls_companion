class Logger {
    /**
     * Log a message
     * @param {string} level The log level
     * @param {string} message The message to log
     * @private
     */
    static log(level, message) {
        send({
            event: 'log',
            data: {
                level: level,
                message: message
            }
        });
    }

    /**
     * Log a INFO message 
     * @param {string} message The message to log
     * @static
     */
    static info(message) {
        Logger.log('info', message);
    }

    /**
     * Log a ERROR message 
     * @param {string} message The message to log
     * @static
     */
    static error(message) {
        Logger.log('error', message);
    }

    /**
     * Log a WARNING message 
     * @param {string} message The message to log
     * @static
     */
    static warning(message) {
        Logger.log('warning', message);
    }
}
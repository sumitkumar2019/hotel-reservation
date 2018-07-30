'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

//Configuring Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `[${info.timestamp}] ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new (winston.transports.Console),
        new winston.transports.File({filename: logDir+'/app.log'})
    ],exitOnError: false
});

module.exports = logger;


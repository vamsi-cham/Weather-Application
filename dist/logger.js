"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const customFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`;
}));
const logger = (0, winston_1.createLogger)({
    format: customFormat,
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'app.log' })
    ]
});
exports.default = logger;

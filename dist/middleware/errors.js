"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const errors = (error, res) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
};
exports.errors = errors;

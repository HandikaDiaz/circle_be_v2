"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const error_handler_1 = require("../libs/error.handler");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof error_handler_1.CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
exports.errorMiddleware = errorMiddleware;

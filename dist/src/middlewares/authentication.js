"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        req.user = decode;
        res.locals.user = decode;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authentication = authentication;

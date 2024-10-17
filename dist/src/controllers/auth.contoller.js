"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = checkAuth;
exports.register = register;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
const authService = __importStar(require("../services/auth.service"));
function checkAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            res.json(user);
        }
        catch (error) {
            console.log(error);
            const err = error;
            res.status(500).json({
                message: err.message
            });
        }
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const registerDto = req.body;
            const user = yield authService.register(registerDto);
            res.json({
                user
            });
        }
        catch (error) {
            console.log(error);
            const err = error;
            res.status(500).json({
                message: err.message
            });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginDto = req.body;
            const user = yield authService.login(loginDto);
            res.json({
                user
            });
        }
        catch (error) {
            console.log(error);
            const err = error;
            res.status(500).json({
                message: err.message
            });
        }
    });
}
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            yield authService.forgotPassword(email);
            res.json({ message: 'Reset password link has been sent to your email' });
        }
        catch (error) {
            console.log(error);
            const err = error;
            res.status(500).json({
                message: err.message
            });
        }
    });
}
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.params.token;
            const password = req.body.password;
            yield authService.resetPassword(token, password);
            res.json({ message: 'Password reset successful' });
        }
        catch (error) {
            console.log(error);
            const err = error;
            res.status(500).json({
                message: err.message
            });
        }
    });
}

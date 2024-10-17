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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = __importStar(require("../repositories/auth.repository"));
const profileRepository = __importStar(require("../repositories/profile.repository"));
const mail_service_1 = require("./mail.service");
const register = (registerDto) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield userRepository.findUserByUsernameOrEmail(registerDto.email);
    if (existUser) {
        throw new Error('User already exists');
    }
    const salt = 10;
    const hashedPassword = yield bcrypt_1.default.hash(registerDto.password, salt);
    const username = registerDto.email.split('@')[0];
    const createUser = yield userRepository.createUser(Object.assign(Object.assign({}, registerDto), { username: username, password: hashedPassword }));
    const { password } = createUser, userToSign = __rest(createUser, ["password"]);
    const token = jsonwebtoken_1.default.sign(userToSign, process.env.JWT_SECRET, { expiresIn: '1d' });
    return {
        message: 'Register successfully',
        token
    };
});
exports.register = register;
const login = (loginDto) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield userRepository.findUserByUsernameOrEmail(loginDto.username);
    if (!existUser) {
        throw new Error('User not found');
    }
    ;
    const isValidPassword = yield bcrypt_1.default.compare(loginDto.password, existUser.password);
    if (!isValidPassword) {
        throw new Error('Wrong password');
    }
    ;
    const token = jsonwebtoken_1.default.sign({
        id: existUser.id,
        email: existUser.email,
        username: existUser.username
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return {
        message: 'Login successfully',
        token
    };
});
exports.login = login;
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findUserByUsernameOrEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const token = jsonwebtoken_1.default.sign({
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
    yield (0, mail_service_1.sendEmail)(email, token);
    return 'Success';
});
exports.forgotPassword = forgotPassword;
const resetPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        throw new Error('Invalid token');
    }
    const user = yield userRepository.findUserByUsernameOrEmail(decode.email);
    if (!user) {
        throw new Error('User not found');
    }
    const salt = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    yield profileRepository.updateProfile({
        password: hashedPassword
    }, user.id);
    return 'Success';
});
exports.resetPassword = resetPassword;

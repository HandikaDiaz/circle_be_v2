"use strict";
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
exports.sendEmail = sendEmail;
const nodemailer_1 = require("../libs/nodemailer");
function sendEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: 'your email',
            to: email,
            subject: 'Password reset',
            html: `
        <div style="text-align: center;">
            <h1>Reset Password</h1>
            <a style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px;" href="http://localhost:3000/api/v1/auth/reset-password/${token}">Click here to reset password</a>
        </div>`
        };
        yield nodemailer_1.transporter.sendMail(mailOptions);
    });
}

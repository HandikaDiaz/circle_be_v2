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
exports.findUserByUsernameOrEmail = findUserByUsernameOrEmail;
exports.createUser = createUser;
exports.findUser = findUser;
const prisma_1 = require("../libs/prisma");
function findUserByUsernameOrEmail(usernameOrEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.user.findFirst({
            where: {
                OR: [
                    { email: usernameOrEmail },
                    { username: usernameOrEmail }
                ]
            }
        });
    });
}
function createUser(registerDto) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.user.create({
            data: {
                fullname: registerDto.fullname,
                email: registerDto.email,
                username: registerDto.username,
                password: registerDto.password,
                profile: {
                    create: {
                        id: registerDto.id,
                    }
                }
            }
        });
    });
}
;
function findUser(loginDto) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.user.findUnique({
            where: {
                email: loginDto.username
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullname: true,
            }
        });
    });
}
;

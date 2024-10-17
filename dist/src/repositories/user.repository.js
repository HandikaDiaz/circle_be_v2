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
exports.findUser = findUser;
exports.findUserByUsername = findUserByUsername;
exports.searchUser = searchUser;
const prisma_1 = require("../libs/prisma");
function findUser(body, id) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                fullname: true,
                username: true,
                profile: true,
                _count: {
                    select: {
                        followers: true,
                        following: true
                    },
                }
            },
        });
    });
}
function searchUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query } },
                    { fullname: { contains: query } }
                ]
            },
            include: {
                profile: true
            },
            take: 5
        });
    });
}

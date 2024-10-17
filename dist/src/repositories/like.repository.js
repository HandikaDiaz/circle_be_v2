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
exports.createLike = createLike;
exports.deleteLike = deleteLike;
exports.findLike = findLike;
const prisma_1 = require("../libs/prisma");
function createLike(userId, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.likes.create({
            data: {
                userId,
                threadId
            }
        });
    });
}
function deleteLike(userId, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.likes.delete({
            where: {
                userId_threadId: {
                    userId,
                    threadId
                }
            }
        });
    });
}
function findLike(userId, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.likes.findUnique({
            where: {
                userId_threadId: {
                    userId,
                    threadId
                }
            }
        });
    });
}

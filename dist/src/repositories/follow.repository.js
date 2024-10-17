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
exports.createFollow = createFollow;
exports.deleteFollow = deleteFollow;
exports.checkFollow = checkFollow;
const prisma_1 = require("../libs/prisma");
function createFollow(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.follows.create({
            data: {
                followerId,
                followingId
            }
        });
    });
}
function deleteFollow(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.follows.delete({
            where: {
                followingId_followerId: {
                    followingId,
                    followerId
                }
            }
        });
    });
}
function checkFollow(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.follows.findUnique({
            where: {
                followingId_followerId: {
                    followingId,
                    followerId
                }
            }
        });
    });
}

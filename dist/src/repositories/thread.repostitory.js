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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThread = createThread;
exports.createThreadImage = createThreadImage;
exports.findThreadById = findThreadById;
exports.findThreadByFollowerId = findThreadByFollowerId;
const prisma_1 = require("../libs/prisma");
function createThread(createThread) {
    return __awaiter(this, void 0, void 0, function* () {
        const { images } = createThread, data = __rest(createThread, ["images"]);
        return prisma_1.prisma.threads.create({
            data: Object.assign(Object.assign({}, data), { mainThreadId: createThread.mainThreadId ? +createThread.mainThreadId : null }),
        });
    });
}
function createThreadImage(createThread) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.threads.create({
            data: Object.assign(Object.assign({}, createThread), { mainThreadId: createThread.mainThreadId ? +createThread.mainThreadId : null, images: {
                    createMany: {
                        data: createThread.images.map((image) => ({ url: image.url }))
                    }
                } }),
        });
    });
}
function findThreadById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.threads.findUnique({
            where: { id },
            include: {
                images: true,
                author: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                    }
                },
                _count: {
                    select: {
                        replies: true,
                        like: true
                    }
                }
            }
        });
    });
}
function findThreadByFollowerId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}

import { prisma } from "../libs/prisma";

export async function createLike(userId: number, threadId: number) {
    return await prisma.likes.create({
        data: {
            userId,
            threadId
        }
    })
}

export async function deleteLike(userId: number, threadId: number) {
    return await prisma.likes.delete({
        where: {
            userId_threadId: {
                userId,
                threadId
            }
        }
    })
}

export async function findLike(userId: number, threadId: number) {
    return await prisma.likes.findUnique({
        where: {
            userId_threadId: {
                userId,
                threadId
            }
        }
    })
}
import { prisma } from "../libs/prisma";

export async function createFollow(followerId: number, followingId: number) {
    return await prisma.follows.create({
        data: {
            followerId,
            followingId
        }
    })
}

export async function deleteFollow(followerId: number, followingId: number) {
    return await prisma.follows.delete({
        where: {
            followingId_followerId: {
                followingId,
                followerId
            }
        }
    })
}

export async function checkFollow(followerId: number, followingId: number) {
    return await prisma.follows.findUnique({
        where: {
            followingId_followerId: {
                followingId,
                followerId
            }
        }
    })
}
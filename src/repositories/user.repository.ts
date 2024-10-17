import * as DTO from "../dto/profile.dto"
import { prisma } from "../libs/prisma"

export async function findUser(body: DTO.UpdateProfileDTO, id: number) {

}

export async function findUserByUsername(username: string) {
    return prisma.user.findUnique({
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
    })
}

export async function searchUser(query: string) {
    return prisma.user.findMany({
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
    })
}
import * as DTO from "../dto/profile.dto"
import { prisma } from "../libs/prisma"

export async function updateProfile(body: DTO.UpdateProfileDTO, id: number) {
    const {username, fullname, ...data} = body;
    return await prisma.profile.update({
        where: { userId: id },
        data: {
            ...data,
            user: {
                update: {
                    username,
                    fullname
                }
            }
        } 
    })
}
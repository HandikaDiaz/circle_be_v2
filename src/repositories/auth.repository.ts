import { prisma } from "../libs/prisma";
import * as DTO from '../dto/auth.dto';

export async function findUserByUsernameOrEmail(usernameOrEmail : string){
    return prisma.user.findFirst({
        where: {
            OR: [
                {email: usernameOrEmail},
                {username: usernameOrEmail}
            ]
        }
    });
}

export async function createUser(registerDto : DTO.RegisterDTO){
    return prisma.user.create({
        data: {
            fullname: registerDto.fullname,
            email: registerDto.email,
            username: registerDto.username!,
            password: registerDto.password,
            profile: {
                create: {
                    id: registerDto.id,
                }
            }
        }
    });
};

export async function findUser(loginDto : DTO.LoginDTO){
    return prisma.user.findUnique({
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
};
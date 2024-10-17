import * as DTO from '../dto/thread.dto';
import { prisma } from "../libs/prisma";

export async function createThread(createThread: DTO.CreateThreadDTO) {
    const {images, ...data} = createThread
    return prisma.threads.create({
        data: {
            ...data,
            mainThreadId: createThread.mainThreadId ? +createThread.mainThreadId : null,
        },
    })
}

export async function createThreadImage(createThread: DTO.CreateThreadDTO) {
    return prisma.threads.create({
        data: {
            ...createThread,
            mainThreadId: createThread.mainThreadId ? +createThread.mainThreadId : null,
            images: {
                createMany: {
                    data: createThread.images!.map((image) => ({ url: image.url }))
                }
            }
        },
    })
}

export async function findThreadById(id: number) {
    return prisma.threads.findUnique({
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
    })
}

export async function findThreadByFollowerId(id: number) {
    return
}
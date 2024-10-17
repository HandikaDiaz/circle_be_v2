import * as likeRepository from '../repositories/like.repository'

export async function createLike(userId: number, threadId: number) {
    const exist = await likeRepository.findLike(userId, threadId)
    if (exist) {
        await likeRepository.deleteLike(userId, threadId)
        return 'Unlike successfully'
    }
    await likeRepository.createLike(userId, threadId)
    return 'Like successfully'
}

export async function checkLike(userId: number, threadId: number) {
    return await likeRepository.findLike(userId, threadId)
}
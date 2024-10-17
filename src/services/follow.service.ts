import * as followRepository from "../repositories/follow.repository";

export async function createFollow(followerId: number, followingId: number) {
    const exist = await followRepository.checkFollow(followingId, followerId);
    if (exist) {
        await followRepository.deleteFollow(followingId, followerId);
        return 'Unfollow successfully';
    }
    await followRepository.createFollow(followingId, followerId);
    return 'Follow successfully';
}

export async function checkFollow(followerId: number, followingId: number) {
    return await followRepository.checkFollow(followingId, followerId);
}
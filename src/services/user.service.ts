import * as userRepository from '../repositories/user.repository'

export async function findUserByUsername(username: string) {
    return await userRepository.findUserByUsername(username)
}

export async function searchUser(query: string) {
    return await userRepository.searchUser(query)
}
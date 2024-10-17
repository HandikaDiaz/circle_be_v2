import * as DTO from '../dto/thread.dto';
import * as threadRepository from '../repositories/thread.repostitory';

export async function createThread(createDTOFromBody: DTO.CreateThreadDTO) {
    const thread = await threadRepository.createThread(createDTOFromBody);
    if(createDTOFromBody.images) {
        await threadRepository.createThreadImage({
            ...createDTOFromBody,
            mainThreadId: thread.id
        })
    }
    return {
        message: 'Thread successfully to post',
        thread
    };
}

export async function findThreadById(id: number) {
    return await threadRepository.findThreadById(id);
}
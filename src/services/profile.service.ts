import { UpdateProfileDTO } from '../dto/profile.dto';
import uploader from '../libs/cloudinary';
import * as profileRepository from '../repositories/profile.repository'

export async function updateProfile(updateDTOFromBody: UpdateProfileDTO, id: number) {
    await Promise.all(
        Object.entries(updateDTOFromBody).map(async ([key, value]) => {
            if (typeof value !== 'string') {
                const url = (await uploader(value))[0].url
                updateDTOFromBody[key] = url
            }
        })
    )
    return profileRepository.updateProfile(updateDTOFromBody, id)
}
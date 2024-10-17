export interface UpdateProfileDTO extends Record<string, any>{
    fullname?: string,
    username?: string,
    bio?: string,
    avatar?: string | { [key: string]: Express.Multer.File[] },
    background?: string | { [key: string]: Express.Multer.File[] }
}
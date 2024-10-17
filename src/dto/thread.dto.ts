export interface CreateThreadDTO {
    content?: string;
    authorId: number;
    mainThreadId?: number;
    images?: ThreadImage[];
}

export interface ThreadImage {
    url: string;
}
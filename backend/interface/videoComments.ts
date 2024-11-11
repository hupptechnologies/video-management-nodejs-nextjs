import { CreationOptional, Optional } from 'sequelize';

export interface IVideoComments {
    readonly id?: CreationOptional<number>
    userId: number
    videoId: number
    comment: string
    readonly createdAt?: Date
    readonly updatedAt?: Date
}

export type TVideoComments = Optional<IVideoComments,
    'userId' | 'videoId' | 'id' | 'comment' >;


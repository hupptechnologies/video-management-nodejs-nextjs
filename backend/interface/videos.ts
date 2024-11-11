import { CreationOptional, Optional } from 'sequelize';

export interface IVideo {
    readonly id?: CreationOptional<number>
    name: string
    url: string
    userId: number
    channelId: number
    isDeleted?: boolean
    approval: string
    readonly createdAt?: Date
    readonly updatedAt?: Date
}

export type TVideo = Optional<IVideo,
    'name' | 'url' | 'userId' | 'channelId' | 'isDeleted' | 'id' | 'approval'>;


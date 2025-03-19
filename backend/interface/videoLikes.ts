import { CreationOptional, Optional } from 'sequelize';

export interface IVideoLikes {
	readonly id?: CreationOptional<number>;
	userId: number;
	videoId: number;
	isLike: boolean;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type TVideoLikes = Optional<
	IVideoLikes,
	'userId' | 'videoId' | 'id' | 'isLike'
>;

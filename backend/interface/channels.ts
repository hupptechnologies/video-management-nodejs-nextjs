import { CreationOptional, Optional } from 'sequelize';

export interface IChannel {
	readonly id?: CreationOptional<number>;
	name: string;
	userId: number;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type TChannel = Optional<IChannel, 'name' | 'userId' | 'id'>;

import {
	Table,
	Model,
	Column,
	DataType,
	HasMany,
	BelongsTo,
} from 'sequelize-typescript';
import { TChannel } from '../interface';
import Videos from './videos.model';
import Users from './users.model';
@Table({
	timestamps: true,
	tableName: 'channels',
	freezeTableName: true,
	schema: 'admin',
})
export default class Channels extends Model<TChannel> {
	@Column(DataType.STRING(1024))
	declare name: string;

	@Column(DataType.INTEGER)
	declare userId: number;

	@HasMany(() => Videos, {
		foreignKey: 'channelId',
		as: 'videos',
	})
	declare videos: Videos[];

	@BelongsTo(() => Users, {
		foreignKey: 'userId',
		as: 'users',
	})
	declare users: Users[];
}

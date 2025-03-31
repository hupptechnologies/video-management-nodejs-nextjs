import {
	Table,
	Model,
	Column,
	DataType,
	BelongsTo,
	HasMany,
} from 'sequelize-typescript';
import { TVideo } from '../interface';
import Channels from './channel.model';
import Users from './users.model';
import VideoLikes from './videoLikes.model';
import VideoComments from './videoComments.model';
@Table({
	timestamps: true,
	tableName: 'videos',
	freezeTableName: true,
	schema: 'admin',
})
export default class Videos extends Model<TVideo> {
	@Column(DataType.STRING(1024))
	declare name: string;

	@Column(DataType.STRING(1024))
	declare url: string;

	@Column(DataType.INTEGER)
	declare userId: number;

	@Column(DataType.INTEGER)
	declare channelId: number;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	declare isDeleted: boolean;

	@Column({
		type: DataType.ENUM,
		values: ['pending', 'approved', 'rejected'],
		defaultValue: 'pending',
	})
	declare approval: string;

	@BelongsTo(() => Channels, {
		foreignKey: 'channelId',
		as: 'channels',
	})
	declare channels: Channels;

	@BelongsTo(() => Users, {
		foreignKey: 'userId',
		as: 'users',
	})
	declare users: Users;

	@HasMany(() => VideoLikes, {
		foreignKey: 'videoId',
		as: 'videoLikes',
	})
	declare videoLikes: VideoLikes[];

	@HasMany(() => VideoComments, {
		foreignKey: 'videoId',
		as: 'videoComments',
	})
	declare videoComments: VideoComments[];
}

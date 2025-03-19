import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { IUsers, TUsers } from '../interface';
import Channels from './channel.model';
import Videos from './videos.model';
import VideoLikes from './videoLikes.model';
import VideoComments from './videoComments.model';
@Table({
	timestamps: true,
	tableName: 'users',
	freezeTableName: true,
	schema: 'admin',
})
export default class Users extends Model<IUsers, TUsers> {
	@Column(DataType.STRING(1024))
	declare name: string;

	@Column(DataType.STRING(1024))
	declare email: string;

	@Column(DataType.STRING)
	declare password: string;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	declare isDeleted: boolean;

	@Column({
		type: DataType.ENUM,
		values: ['user', 'admin'],
		defaultValue: 'user',
	})
	declare role: string;

	@HasMany(() => Videos, {
		foreignKey: 'userId',
		as: 'videos',
	})
	declare videos: Videos[];

	@HasMany(() => Channels, {
		foreignKey: 'userId',
		as: 'channels',
	})
	declare channels: Channels[];

	@HasMany(() => VideoLikes, {
		foreignKey: 'userId',
		as: 'videoLikes',
	})
	declare videoLikes: VideoLikes[];

	@HasMany(() => VideoComments, {
		foreignKey: 'userId',
		as: 'videoComments',
	})
	declare videoComments: VideoComments[];
}

import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import Users from './users.model';
import Videos from './videos.model';
import { TVideoComments } from '../interface';

@Table({
	timestamps: true,
	tableName: 'video_comments',
	freezeTableName: true,
	schema: 'admin',
})
export default class VideoComments extends Model<TVideoComments> {
	@ForeignKey(() => Users)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare userId: number;

	@ForeignKey(() => Videos)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare videoId: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
	})
	declare comment: string;

	@BelongsTo(() => Users, {
		foreignKey: 'userId',
		as: 'users',
	})
	declare user: Users;

	@BelongsTo(() => Videos, {
		foreignKey: 'videoId',
		as: 'videos',
	})
	declare video: Videos;
}

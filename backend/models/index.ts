/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv')
	.config({
		path: '.env'
	});

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import { Sequelize } from 'sequelize-typescript';
import VideoLikes from './videoLikes.model';
import Users from './users.model';
import Videos from './videos.model';
import Channels from './channel.model';
import VideoComments from './videoComments.model';

export interface Models {
    VideoLikes: typeof VideoLikes;
    Users: typeof Users;
    Videos: typeof Videos;
    Channels: typeof Channels;
    VideoComments: typeof VideoComments;
}

const sequelize = new Sequelize({
	database: config.database,
	dialect: 'postgres',
	username: config.username,
	password: config.password,
	repositoryMode: true,
	models: [__dirname + '/*.model.*'],
	logging: false
});

sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

export const models = sequelize.models as unknown as Models;

export default sequelize;


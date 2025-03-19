import { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import path from 'path';
import { message } from '../utils';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const errorMessage = (type: string) => {
	if (type === 'logo') {
		return message.IMAGE_INVALID;
	} else if (type === 'song') {
		return message.SONG_INVALID;
	} else if (type === 'video') {
		return message.VIDEO_INVALID;
	} else {
		return message.FILE_INVALID;
	}
};

const imageFilter = (req: FastifyRequest, file: any, cb: any) => {
	if (file.mimetype.startsWith('image') && file.fieldname === 'logo') {
		cb(null, true);
	} else if (file.mimetype.startsWith('audio') && file.fieldname === 'song') {
		cb(null, true);
	} else if (file.mimetype.startsWith('video') && file.fieldname === 'video') {
		cb(null, true);
	} else {
		const error = new Error();
		error.message = errorMessage(file.fieldname);
		cb(error, false);
	}
};

const pathKey: any = {
	logo: path.resolve('src/public/image/'),
	song: './public/song',
	video: path.resolve('src/public/video/'),
};

const storage = multer.diskStorage({
	destination(req: FastifyRequest, file: any, cb: DestinationCallback) {
		const path = pathKey[file.fieldname];
		cb(null, path);
	},
	filename(req: FastifyRequest, file: any, cb: FileNameCallback) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname),
		);
	},
});

const uploadfile = multer({
	storage,
	fileFilter: imageFilter,
});

export default uploadfile;

import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { Response, statusCodes } from '../utils';

class Cloudinary {
	async uploadVideo (req: any, res: any) {
		try {
			if (req.file) {
				cloudinary.config({
					cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
					api_key: process.env.CLOUDINARY_API_KEY,
					api_secret: process.env.CLOUDINARY_API_SECRET
				});

				const cloudinaryData = await cloudinary.uploader.unsigned_upload(
					`${path.resolve(`src/public/video/${req.file.filename}`)}`,
					`${process.env.CLOUDINARY_UPLOAD_PRESET}`,
					{
						resource_type: "video"
					});

				fs.unlink(req.file.path, (err) => {
					if (err) {
						console.error('Error deleting uploaded file:', err);
					}
				});

				return cloudinaryData?.secure_url || '';
			}
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}}

export default new Cloudinary();


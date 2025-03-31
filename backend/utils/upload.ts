import 'dotenv/config';
import { S3 } from '@aws-sdk/client-s3';

const awsS3 = new S3({
	region: 'us-east-1',
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '',
	},
});

export const uploadFile = (key: any, data: any) =>
	awsS3.putObject({
		Bucket: process.env.BUCKET_NAME ?? '',
		Key: key,
		Body: data,
		// ACL: 'public-read'
	});

export const removeFile = (key: any) =>
	awsS3.deleteObject({
		Bucket: process.env.BUCKET_NAME ?? '',
		Key: key,
	});

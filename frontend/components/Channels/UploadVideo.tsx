import React, { useState } from 'react';
import {
	Box,
	Button,
	IconButton,
	Modal,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Close, Upload, VideoFile } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import CircularProgressLoader from '../CircularProgressLoader';
import { videoService } from '@/services/video';
import { showToast } from '@/store/feature/toast/slice';
import { uploadVideoSchema } from '@/lib/yup/schema';
import '@/styles/components/UploadVideo.css';

const UploadVideo = ({ channelId }: { channelId: number }) => {
	const [openModal, setOpenModal] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [videoData, setVideoData] = useState<{
		name: string;
		file: File | null;
	}>({
		name: '',
		file: null,
	});
	const [errors, setErrors] = useState<{ name?: string; file?: string }>({});
	const dispatch = useDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({});

		const { name, value, files } = e.target;

		if (name === 'videoName') {
			setVideoData((prev) => ({ ...prev, name: value }));
		} else if (name === 'videoFile' && files?.[0]) {
			const file = files[0];

			if (
				!['video/mp4', 'video/mov', 'video/avi', 'video/mkv'].includes(
					file.type,
				)
			) {
				setErrors((prev) => ({ ...prev, file: 'Invalid file format' }));
				return;
			}

			setVideoData((prev) => ({ ...prev, file }));
			setErrors((prev) => ({ ...prev, file: '' }));
		}
	};

	const toggleModal = () => setOpenModal((prev) => !prev);

	const handleUpload = async () => {
		try {
			await uploadVideoSchema.validate(videoData, { abortEarly: false });
			setErrors({});
			if (videoData.file) {
				setIsUploading(true);
				const formData = new FormData();
				formData.append('name', videoData.name);
				formData.append('video', videoData.file);
				await videoService.uploadVideo(channelId, formData);
				dispatch(
					showToast({
						message: 'Video uploaded successfully',
						severity: 'info',
					}),
				);
				setIsUploading(false);
				setOpenModal(false);
				setVideoData({ name: '', file: null });
			}
		} catch (err: any) {
			console.error(err);
			const newErrors: { name?: string; file?: string } = {};
			err.inner?.forEach((error: any) => {
				newErrors[error.path as 'name' | 'file'] = error.message;
			});
			setErrors(newErrors);
		}
	};

	return (
		<>
			<Button
				className="upload-video-btn"
				variant="contained"
				color="primary"
				startIcon={<Upload />}
				onClick={toggleModal}
			>
				Upload Video
			</Button>
			<Modal open={openModal} onClose={toggleModal}>
				<Box className="modal-box upload-video-modal-box">
					<Stack
						direction={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography variant="h5">Upload Video</Typography>
						<IconButton onClick={toggleModal}>
							<Close />
						</IconButton>
					</Stack>
					{isUploading ? (
						<Stack alignItems={'center'} spacing={2}>
							<CircularProgressLoader
								height="4rem"
								marginLeft="0"
								width="100%"
							/>
							<Typography variant="body1">
								You will be notified once video is uploaded
							</Typography>
						</Stack>
					) : (
						<Box>
							<TextField
								margin="normal"
								required
								fullWidth
								name="videoName"
								label="Video Name"
								type="text"
								id="videoName"
								value={videoData.name}
								onChange={handleChange}
								error={!!errors.name}
								helperText={errors.name}
							/>
							<Box className="upload-area">
								<input
									name="videoFile"
									accept="video/mp4, video/mov, video/avi, video/mkv"
									type="file"
									id="video-upload"
									hidden
									onChange={handleChange}
								/>
								<label htmlFor="video-upload">
									<Box className="upload-box">
										<VideoFile fontSize="large" color="primary" />
										<Typography variant="body1">
											{videoData.file
												? videoData.file.name
												: 'Click to select or drag video here'}
										</Typography>
									</Box>
								</label>
							</Box>
							{errors.file && (
								<Typography color="error">{errors.file}</Typography>
							)}
							<Button
								className="modal-upload-video-btn"
								variant="contained"
								color="primary"
								fullWidth
								onClick={handleUpload}
							>
								Upload
							</Button>
						</Box>
					)}
				</Box>
			</Modal>
		</>
	);
};

export default UploadVideo;

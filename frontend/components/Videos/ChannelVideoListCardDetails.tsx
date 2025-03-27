'use client';
import { useState } from 'react';
import { Typography, Stack, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import ChannelModal from '../Channels/ChannelModal';
import DeleteModal from '../DeleteModal';
import IconMenu from '../IconMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteVideo, updateVideo } from '@/store/feature/video/action';
import { timeAgo } from '@/utils/helper';
import { validateChannelName } from '@/utils/validation';
import { Video } from '@/types/video';

const ChannelVideoListCardDetails: React.FC<{ video: Video }> = ({ video }) => {
	const [open, setOpen] = useState('');
	const [error, setError] = useState('');
	const [videoName, setVideoName] = useState(video.name);
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		setError('');
		setOpen('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setVideoName(value);

		if (value.length >= 3) {
			setError('');
		}
	};

	const handleUpdate = () => {
		let validationError = validateChannelName(videoName);
		validationError = validationError.replace('Channel', 'Video');
		if (validationError) {
			setError(validationError);
			return;
		}
		if (videoName !== video.name) {
			dispatch(
				updateVideo({
					name: videoName,
					id: video.id,
				}),
			);
		}
		handleClose();
	};
	const handleDelete = () => {
		dispatch(
			deleteVideo({
				id: video.id,
			}),
		);
		handleClose();
	};

	const menuItems = [
		{
			label: (
				<>
					<Edit />
					Edit
				</>
			),
			className: 'secondary-main-color',
			action: () => setOpen('edit'),
		},
		{
			label: (
				<>
					<Delete />
					Delete
				</>
			),
			className: 'delete-color',
			action: () => setOpen('delete'),
		},
	];

	return (
		<>
			<Stack gap={0.5} direction={'row'} justifyContent={'space-between'}>
				<Stack gap={0.5}>
					<Typography variant="h6" component="div">
						{video.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{timeAgo(video.createdAt)}
					</Typography>
				</Stack>
				{video.userId === user?.id && (
					<IconMenu
						menuClassName="video-list-card-details-menu"
						menuItems={menuItems}
					/>
				)}
			</Stack>
			<ChannelModal
				open={open === 'edit'}
				handleClose={handleClose}
				type="update"
				handleSubmit={handleUpdate}
				title="Update Video"
			>
				<TextField
					fullWidth
					label="Video Name"
					variant="outlined"
					value={videoName}
					onChange={handleChange}
					error={!!error}
					helperText={error}
				/>
			</ChannelModal>
			<DeleteModal
				open={open === 'delete'}
				title="Are you sure you want to delete this video?"
				handleClose={handleClose}
				handlePrimaryClick={handleDelete}
			/>
		</>
	);
};

export default ChannelVideoListCardDetails;

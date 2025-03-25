'use client';
import { useState } from 'react';
import {
	Typography,
	Stack,
	IconButton,
	Menu,
	MenuItem,
	TextField,
} from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import ChannelModal from '../Channels/ChannelModal';
import { useAppDispatch } from '@/store/hooks';
import { timeAgo } from '@/utils/helper';
import { validateChannelName } from '@/utils/validation';
import { Video } from '@/types/video';
import DeleteModal from '../DeleteModal';
import { deleteVideo, updateVideo } from '@/store/feature/video/action';

const ChannelVideoListCardDetails: React.FC<{ video: Video }> = ({ video }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);
	const [open, setOpen] = useState('');
	const [error, setError] = useState('');
	const [videoName, setVideoName] = useState(video.name);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		setError('');
		setOpen('');
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
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
		handleMenuClose();
	};
	const handleDelete = () => {
		dispatch(
			deleteVideo({
				id: video.id,
			}),
		);
		handleClose();
		handleMenuClose();
	};

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
				<IconButton
					aria-label="more"
					aria-controls={open ? 'video-list-card-menu' : undefined}
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreVert />
				</IconButton>
				<Menu
					id="video-list-card-menu"
					anchorEl={anchorEl}
					open={menuOpen}
					onClose={handleMenuClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
					className="video-list-card-details-menu"
				>
					<MenuItem
						className="secondary-main-color"
						onClick={() => setOpen('edit')}
						disableRipple
					>
						<Edit />
						Edit
					</MenuItem>
					<MenuItem
						className="delete-color"
						onClick={() => setOpen('delete')}
						disableRipple
					>
						<Delete />
						Delete
					</MenuItem>
				</Menu>
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

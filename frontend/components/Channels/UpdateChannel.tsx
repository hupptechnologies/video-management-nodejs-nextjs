"use client";
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import ChannelModal from './ChannelModal';
import { useAppDispatch } from '@/store/hooks';
import { updateChannel } from '@/store/feature/channel/action';
import { validateChannelName } from '@/utils/validation';
import { Channel } from '@/types/channel';

const UpdateChannel = ({ channel }: { channel: Channel }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [channelName, setChannelName] = useState(channel?.name);
	const dispatch = useAppDispatch();

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setError('');
		setOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setChannelName(value);

		if (value.length >= 3) {
			setError('');
		}
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleUpdate = () => {
		const validationError = validateChannelName(channelName);

		if (validationError) {
			setError(validationError);
			return;
		}
		dispatch(updateChannel({
			name: channelName,
			id: channel.id
		}));
		handleClose();
		handleMenuClose();
	};

	return (
		<>
			<IconButton
				aria-label="more"
				aria-controls={open ? 'menu' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVert />
			</IconButton>
			<Menu
				id="menu"
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={handleMenuClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleOpen}>Update</MenuItem>
			</Menu>
			<ChannelModal open={open} handleClose={handleClose} type='update' handleSubmit={handleUpdate} title='Update Channel' >
				<TextField
					fullWidth
					label="Channel Name"
					variant="outlined"
					value={channelName}
					onChange={handleChange}
					error={!!error}
					helperText={error}
				/>
			</ChannelModal>
		</>
	);
};

export default UpdateChannel;

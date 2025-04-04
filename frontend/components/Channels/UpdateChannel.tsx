'use client';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import ChannelModal from './ChannelModal';
import IconMenu from '../IconMenu';
import { useAppDispatch } from '@/store/hooks';
import { updateChannel } from '@/store/feature/channel/action';
import { validateChannelName } from '@/utils/validation';
import { Channel } from '@/types/channel';

const UpdateChannel = ({ channel }: { channel: Channel }) => {
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

	const handleUpdate = () => {
		const validationError = validateChannelName(channelName);

		if (validationError) {
			setError(validationError);
			return;
		}
		dispatch(
			updateChannel({
				name: channelName,
				id: channel.id,
			}),
		);
		handleClose();
	};

	const menuItems = [
		{
			label: 'Update',
			action: handleOpen,
		},
	];

	return (
		<>
			<IconMenu menuItems={menuItems} />
			<ChannelModal
				open={open}
				handleClose={handleClose}
				type="update"
				handleSubmit={handleUpdate}
				title="Update Channel"
			>
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

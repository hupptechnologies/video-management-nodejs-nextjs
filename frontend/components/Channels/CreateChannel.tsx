'use client';
import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Button, Divider, Stack, TextField } from '@mui/material';
import ChannelModal from './ChannelModal';
import { useAppDispatch } from '@/store/hooks';
import { createChannel } from '@/store/feature/channel/action';
import { validateChannelName } from '@/utils/validation';

const CreateChannel = () => {
	const [open, setOpen] = useState(false);
	const [channelName, setChannelName] = useState('');
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setChannelName('');
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

	const handleSubmit = () => {
		const validationError = validateChannelName(channelName);

		if (validationError) {
			setError(validationError);
			return;
		}
		dispatch(createChannel({
			name: channelName
		}));
		handleClose();
	};

	return (
		<>
			<Stack alignItems={'end'}>
				<Button
					variant="contained"
					startIcon={<Add />}
					color="primary"
					onClick={handleOpen}
				>
                    Create Channel
				</Button>
			</Stack>
			<Divider className='create-channel-divider' />
			<ChannelModal open={open} handleClose={handleClose} type='create' handleSubmit={handleSubmit} title='Create Channel' >
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

export default CreateChannel;

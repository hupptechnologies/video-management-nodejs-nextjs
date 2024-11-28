'use client';
import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Divider, Modal, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { createChannel } from '@/store/feature/channel/action';

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

	const validateChannelName = (value: string) => {
		if (value.length < 3) {
			return 'Channel name must be at least 3 characters long.';
		}

		if (!/^[a-zA-Z]/.test(value)) {
			return 'Channel name must start with an alphabet.';
		}

		if (/[^a-zA-Z0-9 ]/.test(value)) {
			return 'Channel name must not contain special characters.';
		}

		return '';
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
			<Divider sx={{
				marginTop: 3,
				marginBottom: 3
			}} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id="modal-title" variant="h6" component="h2">
                        Create Channel
					</Typography>
					<TextField
						fullWidth
						label="Channel Name"
						variant="outlined"
						value={channelName}
						onChange={handleChange}
						error={!!error}
						helperText={error}
						sx={{
							mt: 2
						}}
					/>
					<Button
						variant="contained"
						color="primary"
						sx={{
							mt: 2
						}}
						onClick={handleSubmit}
					>
                        Submit
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						sx={{
							mt: 2,
							ml: 2
						}}
						onClick={handleClose}
					>
                        Cancel
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default CreateChannel;

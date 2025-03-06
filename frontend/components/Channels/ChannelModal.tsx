'use client';
import React, { ReactNode } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface ChannelProps {
    open: boolean;
    title: string;
    type: 'create' | 'update';
    handleClose: () => void;
    handleSubmit: () => void;
    readonly children: ReactNode;
}

const ChannelModal: React.FC<ChannelProps> = ({
	open, title, type, handleClose, handleSubmit, children
}) => {
	return (
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
				<Typography id="modal-title" variant="h5">
					{title}
				</Typography>
				{children}
				<Button
					variant="contained"
					color="primary"
					sx={{
						mt: 2
					}}
					onClick={handleSubmit}
				>
					{type === 'create' ? 'Submit' : type === 'update' ? 'Update' : '' }
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
	);
};

export default ChannelModal;

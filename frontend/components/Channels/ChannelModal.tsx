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
			<Box className='channel-modal-box'>
				<Typography id="modal-title" variant="h5">
					{title}
				</Typography>
				{children}
				<div className='channel-modal-button-div'>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						{type === 'create' ? 'Submit' : type === 'update' ? 'Update' : '' }
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleClose}
					>
                        Cancel
					</Button>
				</div>
			</Box>
		</Modal>
	);
};

export default ChannelModal;

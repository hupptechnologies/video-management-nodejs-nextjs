import React from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import '@/styles/components/DeleteModal.css';

interface DeleteModalProps {
	open: boolean;
	title: string;
	handleClose: () => void;
	handlePrimaryClick: () => void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({
	open,
	handleClose,
	title,
	handlePrimaryClick,
}) => {
	return (
		<Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
			<Box className="modal-box delete-modal-box">
				<Stack gap={3}>
					<Typography
						className="delete-modal-title-text"
						id="modal-title"
						variant="h5"
					>
						{title}
					</Typography>
					<Stack gap={2} direction={'row'} justifyContent={'center'}>
						<Button variant="outlined" color="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handlePrimaryClick}
						>
							Delete
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default DeleteModal;

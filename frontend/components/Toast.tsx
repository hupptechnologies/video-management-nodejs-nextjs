"use client";
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ToastProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
	open, message, severity, onClose
}) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
		>
			<Alert
				onClose={onClose}
				severity={severity}
				sx={{
					width: 'auto',
					maxWidth: '25rem',
					wordBreak: 'break-word'
				}}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Toast;

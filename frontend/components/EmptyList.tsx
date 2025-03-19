'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { NoItemFound } from '@/assets/image';
import '../styles/common/EmptyList.css';

interface EmptyListProps {
	type: 'channel' | 'video';
	title: string;
	body: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ type, title, body }) => {
	return (
		<Box className="empty-list-box">
			<Box
				component="img"
				src={NoItemFound.src}
				alt={`No ${type === 'channel' ? 'Channels' : 'Videos'} available`}
				className="empty-list-img-box"
			/>
			<Typography variant="h5" className="empty-list-text">
				{title}
			</Typography>
			<Typography variant="body1" color="text.secondary">
				{body}
			</Typography>
		</Box>
	);
};

export default EmptyList;

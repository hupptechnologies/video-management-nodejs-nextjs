"use client";
import React from 'react';
import { CircularProgress, Container } from '@mui/material';

interface CircularProgressLoaderProps {
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
	height?: string;
	marginLeft?: string;
	width?: string;
}

const CircularProgressLoader: React.FC<CircularProgressLoaderProps> = ({
	color = 'primary', height = '90vh'
}) => {
	return (
		<Container maxWidth={false} sx={{
			alignItems: 'center',
			justifyContent: 'center',
			display: 'flex',
			height,
		}}>
			<CircularProgress color={color} />
		</Container>
	);
};

export default CircularProgressLoader;

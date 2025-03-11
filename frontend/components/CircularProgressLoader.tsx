"use client";
import React from 'react';
import { CircularProgress, Container, Theme, useMediaQuery } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { FlexBox } from '@/styles/common';

interface CircularProgressLoaderProps {
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
	height?: string;
	marginLeft?: string;
	width?: string;
}

const CircularProgressLoader: React.FC<CircularProgressLoaderProps> = ({
	color = 'primary', height = '90vh', marginLeft, width
}) => {

	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
	const { collapsed } = useAppSelector(state => state.navigation);

	return (
		<Container maxWidth={false} sx={{
			...FlexBox,
			height,
			marginLeft: marginLeft || (smallScreen || collapsed ? '80px' : '236px'),
			width: width || (smallScreen || collapsed ? "calc(100% - 80px)" : "calc(100% - 236px)")
		}}>
			<CircularProgress color={color} />
		</Container>
	);
};

export default CircularProgressLoader;

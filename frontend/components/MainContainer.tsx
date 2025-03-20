'use client';
import { useAppSelector } from '@/store/hooks';
import { Container, Theme, useMediaQuery } from '@mui/material';
import React, { ReactNode } from 'react';

interface MainContainerProps {
	marginLeft?: string;
	width?: string;
	readonly children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({
	children,
	width,
	marginLeft,
}) => {
	const smallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('lg'),
	);
	const { collapsed } = useAppSelector((state) => state.navigation);

	return (
		<Container
			maxWidth={false}
			sx={{
				m: `16px 16px 16px ${
					marginLeft ? marginLeft : smallScreen || collapsed ? '80px' : '236px'
				}`,
				width:
					(width ?? (smallScreen || collapsed))
						? 'calc(100% - 80px)'
						: 'calc(100% - 236px)',
			}}
		>
			{children}
		</Container>
	);
};

export default MainContainer;

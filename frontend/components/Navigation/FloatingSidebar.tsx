'use client';

import { Avatar, Box, Drawer, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import MainNavigation from './MainNavigation';
import NavMenuButton from '../NavMenuButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFloating } from '@/store/feature/navigation/slice';
import { AppLogo } from '@/assets/image';

const FloatingSidebar = () => {
	const { floating, floatingOnly } = useAppSelector(
		(state) => state.navigation,
	);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onClose = () => {
		dispatch(setFloating(false));
	};

	return (
		<Drawer
			open={floating}
			onClose={onClose}
			elevation={0}
			className={`floating-sidebar-drawer${floatingOnly ? ' show' : ''}`}
		>
			<Stack
				maxWidth={236}
				role="presentation"
				maxHeight="100%"
				pt={1}
				pb={0.5}
				overflow="hidden"
			>
				<Stack direction="row" alignItems="center" px={2} pb={1}>
					<NavMenuButton />
					<Box
						className="navigation-avatar-box"
						onClick={() => {
							router.push('/');
							onClose();
						}}
					>
						<Avatar alt="VideoTube" src={AppLogo.src} />
						<Typography
							variant="subtitle1"
							component="div"
							className="navigation-app-name"
						>
							VideoTube
						</Typography>
					</Box>
				</Stack>
				<MainNavigation onClose={onClose} />
			</Stack>
		</Drawer>
	);
};

export default FloatingSidebar;

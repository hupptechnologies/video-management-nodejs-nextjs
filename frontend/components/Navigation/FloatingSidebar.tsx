'use client';

import { Drawer, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import MainNavigation from './MainNavigation';
import NavMenuButton from '../NavMenuButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFloating } from '@/store/feature/navigation/slice';

const FloatingSidebar = () => {
	const {
		floating, floatingOnly
	} = useAppSelector(state => state.navigation);
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
			sx={{
				overflow: 'hidden',
				display: {
					xs: 'block',
					lg: floatingOnly ? 'block' : 'none'
				},
				'&>div': {
					pr: 0.5
				},
				'&>.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation0': {
					width: '240px'
				}
			}}
		>
			<Stack maxWidth={236} role="presentation" maxHeight="100%" pt={1} pb={0.5} overflow="hidden">
				<Stack direction="row" alignItems="center" px={2} pb={1}>
					<NavMenuButton />
					<Typography onClick={() => {
						router.push('/');
						onClose();
					}} variant="h5" component="div" sx={{
						flexGrow: 1,
						cursor: 'pointer',
						color:'primary.main',
					}}>
					VideoTube
					</Typography>
				</Stack>
				<MainNavigation onClose={onClose} />
			</Stack>
		</Drawer>
	);
};

export default FloatingSidebar;

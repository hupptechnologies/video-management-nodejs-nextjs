'use client';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import FloatingSidebar from './FloatingSidebar';
import StaticSidebar from './StaticSidebar';
import { useEffect } from 'react';
import CollapsedSidebar from './CollapsedSidebar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFloating } from '@/store/feature/navigation/slice';
import NavMenuButton from '../NavMenuButton';
import { usePathname, useRouter } from 'next/navigation';
import { NavigationManagerMainBox } from '@/styles/components/Navigation';

const NavigationManager = () => {
	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
	const { floatingOnly } = useAppSelector(state => state.navigation);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const hideSidebarRoutes = ["/login", "/signup"];
	const isSidebarHidden = hideSidebarRoutes.includes(pathname);

	useEffect(() => {
		if (!smallScreen) {
			dispatch(setFloating(false));
		}
	}, [smallScreen]);

	return (
		<>
			<Box sx={NavigationManagerMainBox}>
				<Box sx={{
					display: 'flex',
					alignItems: 'center',
					color: 'primary.main',
				}}>
					<NavMenuButton />
					<Typography onClick={() => router.push('/')} variant="h5" component="div" sx={{
						flexGrow: 1,
						cursor: 'pointer',
						color:'primary.main',
					}}>
					VideoTube
					</Typography>
				</Box>
				{!isSidebarHidden &&
				<>
					<FloatingSidebar />
					{!floatingOnly && (
						<>
							<StaticSidebar />
							<CollapsedSidebar />
						</>
					)}
				</>
				}
			</Box>
		</>
	);
};

export default NavigationManager;

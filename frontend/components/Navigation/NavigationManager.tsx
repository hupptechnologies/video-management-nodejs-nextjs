'use client';
import { useEffect } from 'react';
import { Avatar, Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import FloatingSidebar from './FloatingSidebar';
import StaticSidebar from './StaticSidebar';
import CollapsedSidebar from './CollapsedSidebar';
import NavMenuButton from '../NavMenuButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFloating } from '@/store/feature/navigation/slice';
import { NavigationManagerMainBox } from '@/styles/components/Navigation';
import AppLogo from '@/assets/image/app-logo.png';

const NavigationManager = () => {
	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
	const {
		floatingOnly, collapsed
	} = useAppSelector(state => state.navigation);
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
				<Box className='navigation-manager-inner-box'>
					{!isSidebarHidden && <NavMenuButton />}
					<Box onClick={() => router.push('/')} className='navigation-avatar-box'>
						<Avatar
							alt={'VideoTube'}
							src={AppLogo.src}
							className='wh-px-50'
						/>
						<Typography variant="h5" component="div" className='navigation-app-name'>
							VideoTube
						</Typography>
					</Box>
				</Box>
				{!isSidebarHidden &&
					<>
						<FloatingSidebar />
						{!floatingOnly && (
							<>
								{collapsed ? <CollapsedSidebar /> : <StaticSidebar />}
							</>
						)}
					</>
				}
			</Box>
		</>
	);
};

export default NavigationManager;

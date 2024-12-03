'use client';

import { Drawer } from '@mui/material';
import MainNavigation from './MainNavigation';
import { useAppSelector } from '@/store/hooks';

const StaticSidebar = () => {
	const { collapsed } = useAppSelector(state => state.navigation);

	return (
		<Drawer
			open
			hideBackdrop
			elevation={0}
			variant="permanent"
			sx={{
				display: {
					xs: 'none',
					lg: collapsed ? 'none' : 'block'
				},
				'&>div': {
					top: '64px',
					width: '240px',
					bottom: 0,
					overflow: 'hidden',
					borderRight: 'none',
					padding: collapsed ? '0 4px' : '0 16px'
				},
			}}
		>
			<MainNavigation />
		</Drawer>
	);
};

export default StaticSidebar;

'use client';

import { Drawer } from '@mui/material';
import MainNavigation from './MainNavigation';

const StaticSidebar = () => {

	return (
		<Drawer
			open
			hideBackdrop
			elevation={0}
			variant="permanent"
			className='static-sidebar-drawer'
		>
			<MainNavigation />
		</Drawer>
	);
};

export default StaticSidebar;

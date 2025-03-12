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
			sx={{
				display: {
					xs: 'none',
					lg: 'block'
				},
				'&>div': {
					top: '64px',
					width: '240px',
					bottom: 0,
					overflow: 'hidden',
					borderRight: 'none',
					padding: '0 16px'
				},
			}}
		>
			<MainNavigation />
		</Drawer>
	);
};

export default StaticSidebar;

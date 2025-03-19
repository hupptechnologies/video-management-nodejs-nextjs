'use client';

import { Box, Drawer, List } from '@mui/material';
import NavItem from './NavItem';
import { collapsedNavigation } from '@/config/siteNavigation';

const CollapsedSidebar = () => {
	return (
		<Drawer
			open
			hideBackdrop
			elevation={0}
			variant="permanent"
			className="collapsed-sidebar-drawer"
		>
			<Box mb="60px" role="presentation" className="collapsed-sidebar-box">
				<List className="collapsed-sidebar-list">
					{collapsedNavigation.map((x) => (
						<NavItem item={x} key={x.name} />
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default CollapsedSidebar;

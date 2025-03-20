'use client';

import { Box, Drawer, List } from '@mui/material';
import NavItem from './NavItem';
import { useAppSelector } from '@/store/hooks';
import { collapsedNavigation } from '@/config/siteNavigation';

const CollapsedSidebar = () => {
	const { isAdmin, authLoading } = useAppSelector((state) => state.auth);

	if (authLoading) {
		return null;
	}

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
					{collapsedNavigation(isAdmin).map((x) => (
						<NavItem item={x} key={x.name} />
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default CollapsedSidebar;

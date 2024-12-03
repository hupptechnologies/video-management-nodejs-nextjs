'use client';

import { Box, Drawer, List } from '@mui/material';
import NavItem from './NavItem';
import { useAppSelector } from '@/store/hooks';
import { collapsedNavigation } from '@/config/siteNavigation';

const CollapsedSidebar = () => {
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
					sm: 'block',
					lg: collapsed ? 'block' : 'none'
				},
				'&>div': {
					top: '64px',
					bottom: 0,
					width: 80,
					overflow: 'hidden',
					borderRight: 'none',
					padding: collapsed ? '0 4px' : '0 16px'
				}
			}}
		>
			<Box
				mb="60px"
				role="presentation"
				sx={{
					scrollbarGutter: 'stable',
					'& > .MuiList-root': {
						px: 0.5,
					},
					'& .MuiListItemIcon-root': {
						minWidth: '24px',
					},

					'& .MuiListItem-root > .MuiButtonBase-root ': {
						padding: '8px 4px 6px',
						borderRadius: '12px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						'&.Mui-selected': {
							'& .MuiListItemText-primary': {
								fontWeight: '600',
							},
						},
						'& .MuiTypography-root ': {
							fontSize: 10,
						},
					},
				}}
			>
				<List sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '4px'
				}}>
					{collapsedNavigation.map((x) => (
						<NavItem item={x} key={x.name} />
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default CollapsedSidebar;

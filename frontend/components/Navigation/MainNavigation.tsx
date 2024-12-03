import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import { useCallback } from 'react';
import { NavItem as NavItemT } from '@/types/config';
import { mainNavigation } from '@/config/siteNavigation';
import { useAppSelector } from '@/store/hooks';

const MainNavigation = ({ onClose }: {onClose?: () => void}) => {

	const {
		isAdmin, authLoading
	} = useAppSelector(state => state.auth);

	const getNavList = useCallback(
		(items: NavItemT[]) => (
			<List sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '4px'
			}}>
				{items.map((x) => (
					<NavItem item={x} key={x.name} onClose={onClose} />
				))}
			</List>
		),
		[]
	);

	if(authLoading) {
		return null;
	}

	return (
		<Box
			role="presentation"
			sx={{
				scrollbarGutter: 'stable',
				'&:not(:hover)::-webkit-scrollbar-thumb ': {
					background: 'transparent',
				},
				'& .MuiListItemIcon-root': {
					minWidth: '48px',
				},

				'& .MuiListItem-root > .MuiButtonBase-root ': {
					px: 1.5,
					py: 0.75,
					borderRadius: '12px',
					'&.Mui-selected': {
						'& .MuiListItemText-primary': {
							fontWeight: '600',
						},
					},
					'& .MuiTypography-root ': {
						fontSize: 14,
					},
				},
			}}
		>
			{getNavList(mainNavigation(isAdmin))}
		</Box>
	);
};

export default MainNavigation;

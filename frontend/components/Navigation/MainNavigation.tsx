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
			<List className='main-navigation-list'>
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
			className='main-navigation-box'
		>
			{getNavList(mainNavigation(isAdmin))}
		</Box>
	);
};

export default MainNavigation;

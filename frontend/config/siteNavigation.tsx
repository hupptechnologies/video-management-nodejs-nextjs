import { NavItem } from '@/types/config';
import {
	Home,
	HomeOutlined,
	SupervisedUserCircle,
	SupervisedUserCircleOutlined,
	VideoLibrary,
	VideoLibraryOutlined,
} from '@mui/icons-material';

export const mainNavigation = (isAdmin: boolean) => {
	const main = [
		{
			name: 'Home',
			href: '/',
			icon: <HomeOutlined />,
			selectedIcon: <Home />,
		},
		{
			name: 'Channels',
			href: '/channels',
			icon: <VideoLibraryOutlined />,
			selectedIcon: <VideoLibrary />,
		},
		isAdmin && {
			name: 'Users',
			href: '/users',
			icon: <SupervisedUserCircleOutlined />,
			selectedIcon: <SupervisedUserCircle />,
		}
	] as NavItem[];
	return main.filter(Boolean);
};

export const collapsedNavigation = [
	{
		name: 'Home',
		href: '/',
		icon: <HomeOutlined />,
		selectedIcon: <Home />,
	},
	{
		name: 'Channels',
		href: '/channels',
		icon: <VideoLibraryOutlined />,
		selectedIcon: <VideoLibrary />,
	},
] as NavItem[];

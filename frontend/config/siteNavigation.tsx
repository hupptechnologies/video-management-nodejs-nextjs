import { NavItem } from '@/types/config';
import {
	Home,
	HomeOutlined,
	VideoLibrary,
	VideoLibraryOutlined,
} from '@mui/icons-material';

export const mainNavigation = () => {
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

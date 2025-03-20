import { NavItem } from '@/types/config';
import {
	Home,
	HomeOutlined,
	SupervisedUserCircle,
	SupervisedUserCircleOutlined,
	ApprovalOutlined,
	Approval,
	VideoLibrary,
	VideoLibraryOutlined,
} from '@mui/icons-material';

const getNavigation = (isAdmin: boolean): NavItem[] =>
	[
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
		...(isAdmin
			? [
					{
						name: 'Users',
						href: '/users',
						icon: <SupervisedUserCircleOutlined />,
						selectedIcon: <SupervisedUserCircle />,
					},
					{
						name: 'Approvals',
						href: '/approvals',
						icon: <ApprovalOutlined />,
						selectedIcon: <Approval />,
					},
				]
			: []),
	].filter(Boolean) as NavItem[];

export const mainNavigation = getNavigation;
export const collapsedNavigation = getNavigation;

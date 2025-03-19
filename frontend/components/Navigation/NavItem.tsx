import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem as NavItemT } from '@/types/config';

type Props = {
	item: NavItemT;
	onClose?: () => void;
};

const NavItem = ({ item, onClose }: Props) => {
	const pathname = usePathname();

	const selected =
		item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);

	return (
		<ListItem disablePadding>
			<ListItemButton
				className="nav-list-item-button"
				onClick={onClose}
				selected={selected}
				href={item.href}
				component={Link}
			>
				<ListItemIcon className="nav-list-item-button-icon">
					{selected ? item.selectedIcon : item.icon}
				</ListItemIcon>
				<ListItemText
					className="nav-list-item-button-text"
					primary={item.name}
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default NavItem;

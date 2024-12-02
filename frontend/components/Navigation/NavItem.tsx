
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem as NavItemT } from '@/types/config';

type Props = {
	item: NavItemT,
	onClose?: () => void,
};

const NavItem = ({
	item, onClose
}: Props) => {
	const pathname = usePathname();

	const selected = item.href === '/'
		? pathname === item.href
		: pathname.startsWith(item.href);

	return (
		<ListItem disablePadding>
			<ListItemButton sx={{
				'&.Mui-selected': {
					backgroundColor: 'primary.50',
				}
			}} onClick={onClose} selected={selected} href={item.href} component={Link}>
				<ListItemIcon sx={{
					color: 'primary.main'
				}}>{selected ? item.selectedIcon : item.icon}</ListItemIcon>
				<ListItemText sx={{
					'& .MuiTypography-root': {
						color: 'primary.main'
					}
				}} primary={item.name} />
			</ListItemButton>
		</ListItem>
	);
};

export default NavItem;

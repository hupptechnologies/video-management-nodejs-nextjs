'use client';
import { IconButton, Theme, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCollapsed, setFloating } from '@/store/feature/navigation/slice';

const NavMenuButton = () => {
	const { collapsed, floating, floatingOnly } = useAppSelector(
		(state) => state.navigation,
	);
	const dispatch = useAppDispatch();
	const smallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('lg'),
	);

	const onClick = () => {
		if (smallScreen || floatingOnly) {
			dispatch(setFloating(!floating));
			return;
		}
		dispatch(setCollapsed(!collapsed));
	};

	return (
		<IconButton
			size="medium"
			color="primary"
			aria-label="menu"
			className="nav-menu-btn-icon"
			onClick={onClick}
		>
			<Menu />
		</IconButton>
	);
};

export default NavMenuButton;

'use client';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/feature/auth/slice';
import { getUserDetails } from '@/store/feature/auth/action';
import '../styles/components/Navbar.css';

const settings = ['Profile', 'My Videos', 'My Channels', 'Logout'];

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
	const {
		isLoggedIn, user
	} = useAppSelector(state => state.auth);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const hideComponentRoutes = ["/login", "/signup"];
	const isComponentHidden = hideComponentRoutes.includes(pathname);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(getUserDetails());
		}
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = (setting: string) => {
		if (setting === 'Logout') {
			dispatch(logout());
		} else if (setting === 'My Videos') {
			router.push('/videos');
		} else if (setting === 'My Channels') {
			router.push(`/channels?user=${user.id}`);
		}
		setAnchorElUser(null);
	};

	const handleSearchSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (searchTerm.trim()) {
			// router.push(`/search?query=${searchTerm}`);
		}
	};

	return (
		<AppBar className='navbar-app-bar' position="sticky">
			<Toolbar className='navbar-tool-bar'>
				<div></div>
				{!isComponentHidden && <Box className='navbar-search-box'>
					<Box component="form" onSubmit={handleSearchSubmit} className='center-flex-box'>
						{isSearchInputFocus && <SearchIcon className='navbar-search-icon' />}
						<InputBase
							onFocus={() => setIsSearchInputFocus(true)}
							onBlur={() => setIsSearchInputFocus(false)}
							placeholder="Search"
							value={searchTerm}
							onChange={handleSearchChange}
							className='navbar-search-input'
							inputProps={{
								'aria-label': 'search'
							}}
						/>
						<Button variant="contained" className='navbar-search-btn' type="submit">
							<SearchIcon className='navbar-search-icon'/>
						</Button>
					</Box>
				</Box>}
				{isLoggedIn ? (
					<Box flexGrow={0}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} className='menu-icon-btn'>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							className='navbar-menu'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				) : (
					<Button className='navbar-login-btn' onClick={() => router.push('/login')}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

'use client';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/feature/auth/slice';
import { getUserDetails } from '@/store/feature/auth/action';
import { theme } from '@/lib/mui/theme';
import { NavbarAppBar } from '@/styles/components/Navbar';

const settings = ['Profile', 'My Videos', 'Logout'];

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
	const { isLoggedIn } = useAppSelector(state => state.auth);
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
		<AppBar sx={NavbarAppBar} position="sticky">
			<Toolbar sx={{
				justifyContent: 'space-between'
			}}>
				<div></div>
				{!isComponentHidden && <Box sx={{
					border: `1px solid ${theme.palette.primary.main}`,
					borderRadius: '40px',
					mr: 2,
				}}>
					<Box component="form" onSubmit={handleSearchSubmit} sx={{
						display: 'flex',
						alignItems: 'center',
					}}>
						{isSearchInputFocus && <SearchIcon sx={{
							color: 'primary.main',
							marginLeft: '8px',
							width: '0.8em',
							height: '0.8em'
						}} />}
						<InputBase
							onFocus={() => setIsSearchInputFocus(true)}
							onBlur={() => setIsSearchInputFocus(false)}
							placeholder="Search"
							value={searchTerm}
							onChange={handleSearchChange}
							sx={{
								ml: 1,
								width: '200px',
								color: 'primary.main',
								padding: '4px 0 4px 4px'
							}}
							inputProps={{
								'aria-label': 'search'
							}}
						/>
						<Button variant="contained" sx={{
							backgroundColor: 'primary.50',
							position: 'relative',
							boxShadow: 'none',
							borderRadius: '0 40px 40px 0',
							'&:hover': {
								boxShadow: 'none',
								backgroundColor: 'primary.200',
							}
						}} type="submit">
							<SearchIcon sx={{
								color: 'primary.main'
							}} />
						</Button>
					</Box>
				</Box>}
				{isLoggedIn ? (
					<Box sx={{
						flexGrow: 0
					}}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{
								p: 0
							}}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{
								mt: '45px'
							}}
							id="menu-appbar"
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
									<Typography sx={{
										textAlign: 'center'
									}}>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				) : (
					<Button sx={{
						color: 'primary.main'
					}} onClick={() => router.push('/login')}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

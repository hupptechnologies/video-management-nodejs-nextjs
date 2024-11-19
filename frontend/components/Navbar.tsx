'use client';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/feature/auth/slice';
import { NavbarAppBar } from '@/styles/components/Navbar';

const settings = ['Profile', 'My Videos', 'Logout'];

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const { isLoggedIn } = useAppSelector(state => state.auth);
	const router = useRouter();
	const dispatch = useAppDispatch();

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
			<Toolbar>
				<Box component="form" onSubmit={handleSearchSubmit} sx={{
					display: 'flex',
					alignItems: 'center',
					mr: 2,
					flexGrow: 1
				}}>
					<SearchIcon sx={{
						color: 'primary.main'
					}} />
					<InputBase
						placeholder="Search…"
						value={searchTerm}
						onChange={handleSearchChange}
						sx={{
							ml: 1,
							width: '200px',
							color: 'primary.main'
						}}
						inputProps={{
							'aria-label': 'search'
						}}
					/>
				</Box>
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

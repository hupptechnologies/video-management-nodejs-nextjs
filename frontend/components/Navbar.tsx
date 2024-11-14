'use client';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import { Search as SearchIcon, Home as HomeIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

const settings = ['Profile', 'My Videos', 'Logout'];

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const { isLoggedIn } = useAppSelector(state => state.auth);
	const router = useRouter();

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = (setting: string) => {
		if (setting === 'Logout') {
			console.log('logout');
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
		<AppBar position="sticky">
			<Toolbar>
				<Link href="/" passHref>
					<IconButton color="inherit">
						<HomeIcon />
					</IconButton>
				</Link>
				<Typography onClick={() => router.push('/')} variant="h5" component="div" sx={{
					flexGrow: 1,
					cursor: 'pointer'
				}}>
					Video Management
				</Typography>
				<Box component="form" onSubmit={handleSearchSubmit} sx={{
					display: 'flex',
					alignItems: 'center',
					mr: 2,
					flexGrow: 1
				}}>
					<SearchIcon />
					<InputBase
						placeholder="Search…"
						value={searchTerm}
						onChange={handleSearchChange}
						sx={{
							ml: 1,
							color: 'inherit',
							width: '200px'
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
					<Button color="inherit" onClick={() => router.push('/login')}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

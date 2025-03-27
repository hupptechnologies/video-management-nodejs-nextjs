'use client';
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface IconMenuProps {
	icon?: React.ReactNode;
	menuClassName?: string;
	menuItems: {
		className?: string;
		label: string | React.ReactNode;
		action: () => void;
	}[];
}

const IconMenu: React.FC<IconMenuProps> = ({
	icon = <MoreVert />,
	menuClassName,
	menuItems,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton aria-label="menu" onClick={handleClick}>
				{icon}
			</IconButton>
			<Menu
				className={menuClassName ?? ''}
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={handleMenuClose}
			>
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						className={item.className ?? ''}
						onClick={() => {
							item.action();
							handleMenuClose();
						}}
					>
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default IconMenu;

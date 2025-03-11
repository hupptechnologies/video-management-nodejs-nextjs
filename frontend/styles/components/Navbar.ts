import { createStyle } from "..";

export const NavbarAppBar = createStyle({
	paddingLeft: '240px',
	backgroundColor: 'background.paper',
	justifyContent: 'center',
	height: '64px',
	boxShadow: 'none'
});

export const NavbarSearchBtn = createStyle({
	backgroundColor: 'primary.50',
	position: 'relative',
	boxShadow: 'none',
	borderRadius: '0 40px 40px 0',
	'&:hover': {
		boxShadow: 'none',
		backgroundColor: 'primary.200',
	}
});

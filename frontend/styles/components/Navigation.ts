import { createStyle } from "..";

export const NavigationManagerMainBox = createStyle({
	top: '0px',
	left: '0px',
	display: 'flex',
	position: 'fixed',
	flexDirection: 'column',
	backgroundColor: 'primary.contrastText',
	zIndex: 1101,
	width: '240px',
	height: '64px',
	justifyContent: 'center',
	padding: '0 16px'
});

export const CollapsedSidebarBox = createStyle({
	scrollbarGutter: 'stable',
	'& > .MuiList-root': {
		px: 0.5,
	},
	'& .MuiListItemIcon-root': {
		minWidth: '24px',
	},

	'& .MuiListItem-root > .MuiButtonBase-root ': {
		padding: '8px 4px 6px',
		borderRadius: '12px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'&.Mui-selected': {
			'& .MuiListItemText-primary': {
				fontWeight: '600',
			},
		},
		'& .MuiTypography-root ': {
			fontSize: 10,
		},
	},
});


export const MainNavigationBox = createStyle({
	scrollbarGutter: 'stable',
	'&:not(:hover)::-webkit-scrollbar-thumb ': {
		background: 'transparent',
	},
	'& .MuiListItemIcon-root': {
		minWidth: '48px',
	},

	'& .MuiListItem-root > .MuiButtonBase-root ': {
		px: 1.5,
		py: 0.75,
		borderRadius: '12px',
		'&.Mui-selected': {
			'& .MuiListItemText-primary': {
				fontWeight: '600',
			},
		},
		'& .MuiTypography-root ': {
			fontSize: 14,
		},
	},
});

import { createStyle } from "..";

export const EmptyChannelListBox = createStyle({
	height: '60vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	color: 'text.secondary',
});

export const ChannelListCard = createStyle({
	borderRadius: 3,
	boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
	transition: 'transform 0.3s ease',
	'&:hover': {
		transform: 'scale(1.02)',
		boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)',
	},
});

export const ChannelListContentCard = createStyle({
	padding: 2,
	'&:last-child':{
		paddingBottom: 2
	}
});

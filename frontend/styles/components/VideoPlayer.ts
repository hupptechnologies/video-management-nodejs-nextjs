import { createStyle } from "..";

export const VideoPlayerControlBoxStyle = createStyle({
	position: 'absolute',
	bottom: 0,
	width: '100%',
	bgcolor: 'rgba(0, 0, 0, 0.6)',
	display: 'flex',
	alignItems: 'center',
	padding: '8px 12px',
	borderRadius: '0 0 16px 16px',
	gap: '8px',
	boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.3)',
	backdropFilter: 'blur(8px)'
});

export const VideoPlayerMainBoxStyle = createStyle({
	bgcolor: '#000',
	position: 'relative',
	borderRadius: '16px',
	overflow: 'hidden',
	maxHeight: '640px'
});

export const VideoPlayerContainerMainBoxStyle = createStyle({
	flex: 2,
	display: "flex",
	flexDirection: "column",
	gap: "16px",
});

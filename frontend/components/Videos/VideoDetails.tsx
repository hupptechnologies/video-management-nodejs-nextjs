import React from 'react';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import DefaultChannelAvatar from '@/assets/image/default-channel-avatar.png';

const VideoDetails = () => {
	const { video } = useAppSelector(state => state.video);

	const handleLike = () => {
		console.log('handleLike');
	};

	const handleDislike = () => {
		console.log('handleDislike');
	};

	return (
		<Box>
			<Stack spacing={1}>
				<Typography
					variant="h5"
				>
					{video?.name}
				</Typography>
				<Stack direction='row' justifyContent={'space-between'}>
					<Link href={`/channels/${video.channels.id}`}>
						<Stack direction='row' alignItems={'center'}>
							<Avatar
								alt={video.channels.name}
								src={DefaultChannelAvatar.src}
								sx={{
									width: 50,
									height: 50,
									borderRadius: '50%',
								}}
							/>
							<Typography
								variant="subtitle1"
							>
								{video.channels.name}
							</Typography>
						</Stack>
					</Link>
					<Box sx={{
						borderRadius: '40px',
						display: 'flex',
						backgroundColor: '#E5E5E5',
					}}>
						<Stack direction="row" alignItems="center">
							<Button
								sx={{
									height: '100%',
									borderRadius: '40px 0 0 40px',
									borderRight: '1px solid #bababa'
								}}
								variant="text"
								startIcon={<ThumbUpAltOutlined />}
								onClick={handleLike}
							>
								<Typography>{video.likeCount}</Typography>
							</Button>
							<Button
								sx={{
									height: '100%',
									borderRadius: '0 40px 40px 0',
								}}
								variant="text"
								startIcon={<ThumbDownAltOutlined />}
								onClick={handleDislike}
							>
								<Typography>{video.dislikeCount}</Typography>
							</Button>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default VideoDetails;

"use client";
import { Grid, Card, CardMedia, CardContent, Typography, Container, useMediaQuery, Theme, Stack, Avatar } from '@mui/material';
import Link from 'next/link';
import CircularProgressLoader from '../CircularProgressLoader';
import EmptyList from '../EmptyList';
import { useAppSelector } from '@/store/hooks';
import { getThumbnailUrl, timeAgo } from '@/utils/helper';
import { Video } from '@/types/video';
import { DefaultChannelAvatar } from '@/assets/image';
import '../../styles/components/VideoPlayer.css';
import '../../styles/pages/Channel.css';

interface VideoListProps {
	videos: Video[];
	isChannnel?: boolean;
}

const VideoList: React.FC<VideoListProps> = ({
	videos, isChannnel
}) => {
	const { isFetchingVideo } = useAppSelector(state => state.video);
	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
	const { collapsed } = useAppSelector(state => state.navigation);

	if (isFetchingVideo) {
		return <CircularProgressLoader />;
	}

	return (
		<Container maxWidth={false} className={isChannnel
			? 'channel-videolist-page-container'
			: smallScreen || collapsed ? 'page-container-smallscreen' : 'page-container'} >
			{videos.length === 0 && typeof window !== 'undefined'
				? <EmptyList type='video' title='No Videos Found' body='Explore other categories or upload new videos to get started.' />
				: <Grid container className='w-100' spacing={2}>
					{videos?.map((video) => (
						<Grid item key={video.id} xs={12} sm={6} md={4} lg={4} xl={3}>
							<Card
								key={video.id}
								className='video-list-item-card'
							>
								<Link href={`/videos/${video.id}`} className='list-item-card-link'>
									<CardMedia
										className='video-list-item-card-media'
										component="img"
										image={getThumbnailUrl(video.url)}
										alt={video.name}
									/>
								</Link>
								<CardContent className='video-list-item-card-content'>
									{isChannnel
										? <Stack gap={0.5}>
											<Typography variant="h6" component="div">
												{video.name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{timeAgo(video.createdAt)}
											</Typography>
										</Stack>
										: <Stack gap={0.5} direction='row'>
											<Avatar
												alt={video.channels?.name}
												src={DefaultChannelAvatar.src}
												className='wh-px-50 br-50'
											/>
											<Stack gap={0.5}>
												<Typography variant="h6" component="div">
													{video.name}
												</Typography>
												<Stack>
													<Typography variant="subtitle1" component="div" lineHeight={1} >
														{video.channels?.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{timeAgo(video.createdAt)}
													</Typography>
												</Stack>
											</Stack>
										</Stack>}
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>}
		</Container>
	);
};

export default VideoList;

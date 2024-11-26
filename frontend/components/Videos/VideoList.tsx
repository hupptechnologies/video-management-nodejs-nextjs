"use client";
import { Grid, Card, CardMedia, CardContent, Typography, Container, useMediaQuery, Theme, Stack, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import CircularProgressLoader from '../CircularProgressLoader';
import { useAppSelector } from '@/store/hooks';
import { getThumbnailUrl, timeAgo } from '@/utils/helper';
import DefaultChannelAvatar from '@/assets/image/default-channel-avatar.png';
import NoVideosFound from '@/assets/image/no-videos-found.webp';
import { Video } from '@/types/video';

interface VideoListProps {
    videos: Video[]
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
	const { isFetchingVideo } = useAppSelector(state => state.video);
	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
	const { collapsed } = useAppSelector(state => state.navigation);

	if (isFetchingVideo) {
		return <CircularProgressLoader />;
	}

	return (
		<Container maxWidth={false} sx={{
			m: '16px 16px 16px 0',
			marginLeft: smallScreen || collapsed ? '80px' : '236px',
			width: smallScreen || collapsed ? "calc(100% - 80px)" : "calc(100% - 236px)"
		}}>
			{videos.length === 0 && typeof window !== 'undefined'
				? (
					<Box
						sx={{
							height: '60vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
							color: 'text.secondary',
						}}
					>
						<Box
							component="img"
							src={NoVideosFound.src}
							alt="No videos available"
							sx={{
								width: '200px',
								height: 'auto',
								mb: 3
							}}
						/>
						<Typography variant="h5" sx={{
							fontWeight: 600,
							mb: 1
						}}>
						No Videos Found
						</Typography>
						<Typography variant="body1" color="text.secondary">
						Explore other categories or upload new videos to get started.
						</Typography>
					</Box>
				)
				: <Grid container sx={{
					width: '100%'
				}} spacing={2}>
					{videos?.map((video) => (
						<Grid item key={video.id} xs={12} sm={6} md={4} lg={4} xl={3}>
							<Card
								key={video.id}
								sx={{
									borderRadius: 3,
									boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
									transition: 'transform 0.3s ease',
									'&:hover': {
										transform: 'scale(1.02)',
										boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)',
									},
								}}
							>
								<Link href={`/videos/${video.id}`} style={{
									textDecoration: 'none'
								}}>
									<CardMedia
										sx={{
											height: 240,
											borderTopLeftRadius: 'inherit',
											borderTopRightRadius: 'inherit',
											overflow: 'hidden',
											position: 'relative',
										}}
										component="img"
										image={getThumbnailUrl(video.url)}
										alt={video.name}
									/>
								</Link>
								<CardContent sx={{
									padding: 2
								}}>
									<Stack gap={0.5} direction='row'>
										<Avatar
											alt={video.channels.name}
											src={DefaultChannelAvatar.src}
											sx={{
												width: 50,
												height: 50,
												borderRadius: '50%',
											}}
										/>
										<Stack gap={0.5}>
											<Typography variant="h6" component="div" sx={{
												fontWeight: 600,
												color: '#212121'
											}}>
												{video.name}
											</Typography>
											<Stack>
												<Typography variant="subtitle1" component="div" sx={{
													'&': {
														lineHeight: '1',
													},
												}} >
													{video.channels.name}
												</Typography>
												<Typography variant="body2" color="text.secondary">
													{timeAgo(video.createdAt)}
												</Typography>
											</Stack>
										</Stack>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>}
		</Container>
	);
};

export default VideoList;

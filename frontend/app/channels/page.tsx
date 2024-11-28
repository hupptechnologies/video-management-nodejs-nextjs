"use client";
import { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Container, useMediaQuery, Theme, Stack, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import CircularProgressLoader from '@/components/CircularProgressLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getChannels } from '@/store/feature/channel/action';
import withAuth from '@/config/withAuth';
import DefaultChannelAvatar from '@/assets/image/default-channel-avatar.png';
import NoChannelFound from '@/assets/image/no-videos-found.webp';
import CreateChannel from '@/components/Channels/CreateChannel';

const page = () => {

	const {
		channels, isFetchingChannel
	} = useAppSelector(state => state.channel);
	const { isLoggedIn } = useAppSelector(state => state.auth);
	const { collapsed } = useAppSelector(state => state.navigation);
	const dispatch = useAppDispatch();
	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		dispatch(getChannels());
	}, []);

	if (isFetchingChannel) {
		return <CircularProgressLoader />;
	}

	return (
		<Container maxWidth={false} sx={{
			m: '16px 16px 16px 0',
			marginLeft: smallScreen || collapsed ? '80px' : '236px',
			width: smallScreen || collapsed ? "calc(100% - 80px)" : "calc(100% - 236px)"
		}}>
			{isLoggedIn && <CreateChannel/>}
			{channels?.length === 0 && typeof window !== 'undefined'
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
							src={NoChannelFound.src}
							alt="No Channels available"
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
                           No Channels available
						</Typography>
						<Typography variant="body1" color="text.secondary">
                            Create new channel to get started.
						</Typography>
					</Box>
				)
				: <Grid container sx={{
					width: '100%'
				}} spacing={2}>
					{channels?.map((channel) => (
						<Grid item key={channel.id} xs={12} sm={6} md={4} lg={4} xl={3}>
							<Card
								key={channel.id}
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
								<Link href={`/channels/${channel.id}`} style={{
									textDecoration: 'none'
								}}>
									<CardContent sx={{
										padding: 2,
										'&:last-child':{
											paddingBottom: 2
										}
									}}>
										<Stack gap={0.5} alignItems={'center'} direction='row'>
											<Avatar
												alt={channel.name}
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
													{channel.name}
												</Typography>
											</Stack>
										</Stack>
									</CardContent>
								</Link>
							</Card>
						</Grid>
					))}
				</Grid>}
		</Container>
	);
};

export default withAuth(page);

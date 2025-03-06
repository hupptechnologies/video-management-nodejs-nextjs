"use client";
import React, { useEffect } from 'react';
import { Avatar, Box, Container, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import CircularProgressLoader from '@/components/CircularProgressLoader';
import VideoList from '@/components/Videos/VideoList';
import UpdateChannel from '@/components/Channels/UpdateChannel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getChannelById } from '@/store/feature/channel/action';
import { getChannelVideos } from '@/store/feature/video/action';
import withAuth from '@/config/withAuth';
import DefaultChannelAvatar from '@/assets/image/default-channel-avatar.png';

const page = ({ params }: { params: { channelId: number } }) => {

	const { collapsed } = useAppSelector(state => state.navigation);
	const {
		channel, isFetchingChannel
	} = useAppSelector(state => state.channel);
	const { user } = useAppSelector(state => state.auth);
	const {
		videos, isFetchingVideo
	} = useAppSelector(state => state.video);
	const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getChannelById({
			id: params.channelId
		}));
		dispatch(getChannelVideos({
			id: params.channelId
		}));
	}, []);

	if(isFetchingChannel || channel.name === '') {
		return <CircularProgressLoader/>;
	}

	return (
		<Container maxWidth={false} sx={{
			m: '16px 16px 16px 0',
			marginLeft: smallScreen || collapsed ? '80px' : '236px',
			width: smallScreen || collapsed ? "calc(100% - 80px)" : "calc(100% - 236px)"
		}}>
			<Box sx={{
				backgroundColor: 'primary.100',
				borderRadius: '24px'
			}}>
				<Stack alignItems={'center'} direction='row' justifyContent={'space-between'}>
					<Stack alignItems={'center'} direction='row'>
						<Avatar
							alt={channel.name}
							src={DefaultChannelAvatar.src}
							sx={{
								width: 100,
								height: 100,
								borderRadius: '50%',
							}}
						/>
						<Typography variant="h2" component="div">
							{channel.name}
						</Typography>
					</Stack>
					{channel.userId === user?.id && <UpdateChannel channel={channel}/>}
				</Stack>
			</Box>
			{channel.userId === user?.id && ''}
			{isFetchingVideo ? <CircularProgressLoader/> : <VideoList videos={videos} isChannnel />}
		</Container>
	);
};

export default withAuth(page);

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
import '../../../styles/pages/Channel.css';

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
		<Container maxWidth={false} className={smallScreen || collapsed ? 'page-container-smallscreen' : 'page-container'}>
			<Box component={'div'} className='channel-id-main-box'>
				<Stack alignItems={'center'} direction='row' justifyContent={'space-between'}>
					<Stack alignItems={'center'} direction='row'>
						<Avatar
							alt={channel.name}
							src={DefaultChannelAvatar.src}
							className='wh-px-100 br-50'
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

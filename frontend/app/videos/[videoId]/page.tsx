"use client";
import { Box } from '@mui/material';
import React, {  useEffect } from 'react';
import SuggestedVideos from '@/components/Videos/SuggestedVideos';
import VideoPlayer from '@/components/Videos/VideoPlayer';
import VideoDetails from '@/components/Videos/VideoDetails';
import { useAppDispatch } from '@/store/hooks';
import { setFloatingOnly } from '@/store/feature/navigation/slice';
import { VideoIdMainBoxStyle } from '@/styles/videos/VideoId';
import { VideoPlayerContainerMainBoxStyle } from '@/styles/components/VideoPlayer';

export default function VideoPlayerPage ({ params }: { params: { videoId: number } }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setFloatingOnly(true));
		return () => {
			dispatch(setFloatingOnly(false));
		};
	}, []);

	return (
		<Box sx={VideoIdMainBoxStyle}>
			<Box sx={VideoPlayerContainerMainBoxStyle}>
				<VideoPlayer params={params}/>
				<VideoDetails/>
			</Box>
			<SuggestedVideos/>
		</Box>
	);
}

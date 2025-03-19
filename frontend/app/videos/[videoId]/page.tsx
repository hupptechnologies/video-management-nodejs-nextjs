'use client';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import SuggestedVideos from '@/components/Videos/SuggestedVideos';
import VideoPlayer from '@/components/Videos/VideoPlayer';
import VideoDetails from '@/components/Videos/VideoDetails';
import { useAppDispatch } from '@/store/hooks';
import { setFloatingOnly } from '@/store/feature/navigation/slice';
import '../../../styles/components/VideoPlayer.css';

export default function VideoPlayerPage({
	params,
}: {
	params: { videoId: number };
}) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setFloatingOnly(true));
		return () => {
			dispatch(setFloatingOnly(false));
		};
	}, []);

	return (
		<Box className="video-id-page-main-box">
			<Box className="video-player-main-box-container">
				<VideoPlayer params={params} />
				<VideoDetails />
			</Box>
			<SuggestedVideos />
		</Box>
	);
}

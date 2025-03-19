'use client';
import { useEffect } from 'react';
import VideoList from '@/components/Videos/VideoList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getGlobalVideos } from '@/store/feature/video/action';

export default function Home() {
	const { videos } = useAppSelector((state) => state.video);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getGlobalVideos());
	}, [dispatch]);

	return (
		<>
			<VideoList videos={videos} />
		</>
	);
}

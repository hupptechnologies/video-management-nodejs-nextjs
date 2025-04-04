'use client';
import { useEffect } from 'react';
import VideoList from '@/components/Videos/VideoList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserVideos } from '@/store/feature/video/action';
import withAuth from '@/config/withAuth';

function UserVideoList() {
	const { userVideos } = useAppSelector((state) => state.video);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserVideos());
	}, []);

	return <VideoList videos={userVideos} isUser />;
}

export default withAuth(UserVideoList);

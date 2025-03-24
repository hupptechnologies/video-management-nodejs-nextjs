'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoList from '@/components/Videos/VideoList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getGlobalVideos } from '@/store/feature/video/action';

const page = () => {
	const { videos } = useAppSelector((state) => state.video);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const searchParam = searchParams.get('query');

	useEffect(() => {
		if (searchParam) {
			dispatch(getGlobalVideos({ search: searchParam }));
		}
	}, [dispatch, searchParam]);

	return (
		<>
			<VideoList videos={videos} />
		</>
	);
};

export default page;

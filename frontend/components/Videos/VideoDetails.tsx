import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	debounce,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import Link from 'next/link';
import VideoComments from './VideoComments';
import { useAppSelector } from '@/store/hooks';
import { videoService } from '@/services/video';
import { DefaultChannelAvatar } from '@/assets/image';

const handleLikeDislikeDebounce = debounce((video, isLike) => {
	videoService.likeVideo({ videoId: video.id, isLike });
}, 300);

const VideoDetails = () => {
	const { video } = useAppSelector((state) => state.video);
	const { isLoggedIn } = useAppSelector((state) => state.auth);
	const [likeCount, setLikeCount] = useState(parseInt(video?.likeCount) || 0);
	const [dislikeCount, setDislikeCount] = useState(
		parseInt(video?.dislikeCount) || 0,
	);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);

	useEffect(() => {
		if (video) {
			setLikeCount(parseInt(video?.likeCount));
			setDislikeCount(parseInt(video?.dislikeCount));
			setLiked(video.isLike === true);
			setDisliked(video.isLike === false);
		}
	}, [video]);

	const handleLike = () => {
		if (liked) {
			setLikeCount((prev) => prev - 1);
			setLiked(false);
		} else {
			setLikeCount((prev) => prev + 1);
			setLiked(true);
			if (disliked) {
				setDislikeCount((prev) => prev - 1);
				setDisliked(false);
			}
		}
		handleLikeDislikeDebounce(video, true);
	};

	const handleDislike = () => {
		if (disliked) {
			setDislikeCount((prev) => prev - 1);
			setDisliked(false);
		} else {
			setDislikeCount((prev) => prev + 1);
			setDisliked(true);
			if (liked) {
				setLikeCount((prev) => prev - 1);
				setLiked(false);
			}
		}
		handleLikeDislikeDebounce(video, false);
	};

	return (
		<Box>
			<Stack gap={3}>
				<Stack spacing={1}>
					<Typography variant="h5">{video?.name}</Typography>
					<Stack direction="row" justifyContent="space-between">
						<Link href={`/channels/${video.channels.id}`}>
							<Stack direction="row" alignItems="center">
								<Avatar
									alt={video.channels.name}
									src={DefaultChannelAvatar.src}
									className="wh-px-50 br-50"
								/>
								<Typography variant="subtitle1">
									{video.channels.name}
								</Typography>
							</Stack>
						</Link>
						<Box className="video-details-like-dislike-box">
							<Stack direction="row" alignItems="center">
								<Button
									className={`video-player-like-btn${liked ? ' active' : ''}`}
									variant="text"
									startIcon={<ThumbUpAltOutlined />}
									onClick={handleLike}
									disabled={!isLoggedIn}
								>
									<Typography>{likeCount}</Typography>
								</Button>
								<Button
									className={`video-player-dislike-btn${disliked ? ' active' : ''}`}
									variant="text"
									startIcon={<ThumbDownAltOutlined />}
									onClick={handleDislike}
									disabled={!isLoggedIn}
								>
									<Typography>{dislikeCount}</Typography>
								</Button>
							</Stack>
						</Box>
					</Stack>
				</Stack>
				<Divider />
				<VideoComments key={video.id} />
			</Stack>
		</Box>
	);
};

export default VideoDetails;

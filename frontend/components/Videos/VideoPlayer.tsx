"use client";
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Fullscreen } from '@mui/icons-material';
import React, { useRef, useState, useEffect } from 'react';
import CircularProgressLoader from '../CircularProgressLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFloatingOnly } from '@/store/feature/navigation/slice';
import { getVideoById } from '@/store/feature/video/action';
import { VideoPlayerControlBoxStyle, VideoPlayerMainBoxStyle } from '@/styles/components/VideoPlayer';

const VideoPlayer = ({ params }: { params: { videoId: number } }) => {

	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(100);
	const [muted, setMuted] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const {
		isFetchingVideo, video
	} = useAppSelector(state => state.video);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getVideoById({
			id: params.videoId
		}));
	}, []);

	useEffect(() => {
		dispatch(setFloatingOnly(true));
		return () => {
			dispatch(setFloatingOnly(false));
		};
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			video.volume = volume / 100;
		}
	}, [volume]);

	const togglePlay = () => {
		const video = videoRef.current;
		if (video) {
			if (playing) {
				video.pause();
			} else {
				video.play();
			}
			setPlaying(!playing);
		}
	};

	const handleVolumeChange = (event: Event, newValue: number | number[]) => {
		setVolume(newValue as number);
		setMuted(newValue === 0);
	};

	const toggleMute = () => {
		setMuted(!muted);
		const video = videoRef.current;
		if (video) {
			video.muted = !muted;
		}
	};

	const handleProgress = () => {
		const video = videoRef.current;
		if (video) {
			const progressPercentage = (video.currentTime / video.duration) * 100;
			setProgress(progressPercentage);
			setCurrentTime(video.currentTime);
			setDuration(video.duration);
		}
	};

	const handleSeek = (event: Event, newValue: number | number[]) => {
		const video = videoRef.current;
		if (video) {
			const seekTime = (newValue as number / 100) * video.duration;
			video.currentTime = seekTime;
			setProgress(newValue as number);
		}
	};

	const handleFullscreen = () => {
		const video = videoRef.current;
		if (video && video.requestFullscreen) {
			video.requestFullscreen();
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60)
			.toString()
			.padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	if(isFetchingVideo || video.url === '') {
		return <CircularProgressLoader/>;
	}

	return (
		<Box sx={VideoPlayerMainBoxStyle}>
			<video
				ref={videoRef}
				width="100%"
				onTimeUpdate={handleProgress}
				onClick={togglePlay}
				onEnded={() => setPlaying(false)}
				style={{
					borderRadius: '8px',
					outline: 'none'
				}}
			>
				<source src={video.url} type="video/mp4" />
		Your browser does not support the video tag.
			</video>

			<Box sx={VideoPlayerControlBoxStyle}>
				<IconButton onClick={togglePlay} sx={{
					color: 'white'
				}}>
					{playing ? <Pause /> : <PlayArrow />}
				</IconButton>

				<Typography sx={{
					color: 'white',
					mx: 1
				}}>{formatTime(currentTime)}</Typography>

				<Slider
					value={progress}
					onChange={handleSeek}
					sx={{
						flexGrow: 1,
						mx: 2,
						color: 'primary.main',
						'& .MuiSlider-thumb': {
							width: 10,
							height: 10,
							boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)'
						}
					}}
					aria-labelledby="video-progress"
					min={0}
					max={100}
				/>

				<Typography sx={{
					color: 'white',
					mx: 1
				}}>{formatTime(duration)}</Typography>

				<IconButton onClick={toggleMute} sx={{
					color: 'white'
				}}>
					{muted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
				</IconButton>

				<Slider
					value={volume}
					onChange={handleVolumeChange}
					sx={{
						width: 100,
						color: 'primary.main',
						'& .MuiSlider-thumb': {
							width: 8,
							height: 8,
						}
					}}
					aria-labelledby="volume-slider"
					min={0}
					max={100}
				/>

				<IconButton onClick={handleFullscreen} sx={{
					color: 'white'
				}}>
					<Fullscreen />
				</IconButton>
			</Box>
		</Box>
	);
};

export default VideoPlayer;

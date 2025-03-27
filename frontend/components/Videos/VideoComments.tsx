import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CircularProgressLoader from '../CircularProgressLoader';
import IconMenu from '../IconMenu';
import { videoService } from '@/services/video';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showToast } from '@/store/feature/toast/slice';
import { VideoComment } from '@/types/video';

const VideoComments = () => {
	const [comments, setComments] = useState<VideoComment[]>([]);
	const [postComment, setPostComment] = useState('');
	const [loading, setLoading] = useState(false);
	const [updateMode, setUpdateMode] = useState<number | null>(null);
	// const [totalCount, setTotalCount] = useState(0);
	const { video } = useAppSelector((state) => state.video);
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const getComments = useCallback(async () => {
		try {
			setLoading(true);
			const response = await videoService.getVideoComment({
				videoId: video.id,
			});
			setComments(response.data.data.results);
		} finally {
			setLoading(false);
		}
	}, [video.id, dispatch]);

	useEffect(() => {
		if (video.id) {
			getComments();
		}
	}, [video.id, getComments]);

	const handlePostComment = async () => {
		try {
			const {
				data: { data },
			} = await videoService.addVideoComment({
				videoId: video.id,
				comment: postComment,
			});
			if (user && user.id && user.name && user.email) {
				const comment: VideoComment = {
					id: data.id,
					comment: postComment,
					createdAt: data.createdAt,
					users: {
						id: user.id,
						name: user.name,
						email: user.email,
						role: user?.role,
					},
				};
				setComments((prev) => [...prev, comment]);
			}
			setPostComment('');
			// setTotalCount((prev) => prev + 1);
		} catch {
			dispatch(
				showToast({ message: 'Failed to post comment', severity: 'error' }),
			);
		}
	};

	const handleEditClick = (comment: VideoComment) => {
		setPostComment(comment.comment);
		setUpdateMode(comment.id);
	};

	const handleEditComment = async () => {
		if (updateMode) {
			try {
				await videoService.updateVideoComment({
					commentId: updateMode,
					comment: postComment,
				});
				setComments((prev) =>
					prev.map((comment) =>
						comment.id === updateMode
							? { ...comment, comment: postComment }
							: comment,
					),
				);
				setUpdateMode(null);
				setPostComment('');
			} catch {
				dispatch(
					showToast({ message: 'Failed to delete comment', severity: 'error' }),
				);
			}
		}
	};

	const handleDeleteComment = async (commentId: number) => {
		try {
			await videoService.deleteVideoComment({
				commentId,
			});
			setComments((prev) => prev.filter((comment) => comment.id !== commentId));
			// setTotalCount((prev) => prev + 1);
		} catch {
			dispatch(
				showToast({ message: 'Failed to delete comment', severity: 'error' }),
			);
		}
	};

	const renderComment = (comment: VideoComment) => {
		const menuItems = [
			{
				label: (
					<>
						<Edit />
						Edit
					</>
				),
				className: 'secondary-main-color',
				action: () => handleEditClick(comment),
			},
			{
				label: (
					<>
						<Delete />
						Delete
					</>
				),
				className: 'delete-color',
				action: () => handleDeleteComment(comment.id),
			},
		];

		return (
			<Stack key={comment.id} direction="row" alignItems="center" gap={2}>
				<Stack direction="row" alignItems="center" gap={2} flex={1}>
					<Avatar alt={comment.users.name} src="/" />
					<Stack>
						<Typography fontWeight={600} variant="subtitle2">
							{comment.users.name}
						</Typography>
						<Typography variant="body1">{comment.comment}</Typography>
					</Stack>
				</Stack>
				{user.id === comment.users.id && (
					<IconMenu
						menuClassName="video-list-card-details-menu"
						menuItems={menuItems}
					/>
				)}
			</Stack>
		);
	};

	if (loading) {
		return <CircularProgressLoader />;
	}

	return (
		<Stack gap={4}>
			<Stack gap={1}>
				<Typography variant="h5">{comments.length} Comments</Typography>
				<Stack direction="row" gap={2} alignItems="center">
					<Avatar alt={user?.name} src="/" />
					<Stack direction="row" flex="1" gap={2} alignItems="center">
						<TextField
							margin="normal"
							required
							fullWidth
							id="post-comment"
							name="postComment"
							value={postComment}
							variant="standard"
							placeholder="Add a comment..."
							onChange={(e) => setPostComment(e.target.value)}
							disabled={!isLoggedIn}
						/>
						{postComment.length > 2 && (
							<>
								{updateMode && (
									<Button
										variant="outlined"
										color="secondary"
										onClick={() => {
											setUpdateMode(null);
											setPostComment('');
										}}
									>
										Cancel
									</Button>
								)}
								<Button
									variant="contained"
									className="post-comment-btn"
									onClick={updateMode ? handleEditComment : handlePostComment}
								>
									{updateMode ? 'Update' : 'Post'}
								</Button>
							</>
						)}
					</Stack>
				</Stack>
			</Stack>
			<Stack gap={1.5}>
				{comments
					.slice()
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
					)
					.map(renderComment)}
			</Stack>
		</Stack>
	);
};

export default VideoComments;

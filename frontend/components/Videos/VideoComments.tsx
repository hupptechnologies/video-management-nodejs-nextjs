import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useMemo,
} from 'react';
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
	const [totalCount, setTotalCount] = useState(0);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const lastCommentRef = useRef<HTMLDivElement | null>(null);
	const didFetchRef = useRef(false);
	const { video } = useAppSelector((state) => state.video);
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const getComments = useCallback(async () => {
		if (!hasMore) {
			return;
		}

		setLoading(true);
		try {
			const response = await videoService.getVideoComment({
				videoId: video.id,
				offset: (page - 1) * 10,
				limit: 10,
			});

			setComments((prev) => [...prev, ...response.data.data.results]);
			if (comments.length === 0) {
				setTotalCount(response.data.data.totalCount);
			}

			if (response.data.data.results.length < 10) {
				setHasMore(false);
			}
		} finally {
			setLoading(false);
		}
	}, [video.id, page, hasMore]);

	useEffect(() => {
		if (video.id && !didFetchRef.current) {
			didFetchRef.current = true;
			getComments();
		}
	}, [video.id, getComments]);

	useEffect(() => {
		if (!lastCommentRef.current || !hasMore) {
			return;
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prev) => prev + 1);
					if (page === 1) {
						setComments([]);
					}
					getComments();
				}
			},
			{ threshold: 1.0 },
		);

		observerRef.current.observe(lastCommentRef.current);

		return () => observerRef.current?.disconnect();
	}, [comments, hasMore]);

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
			setTotalCount((prev) => prev + 1);
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
			setTotalCount((prev) => prev - 1);
		} catch {
			dispatch(
				showToast({ message: 'Failed to delete comment', severity: 'error' }),
			);
		}
	};

	const renderComment = (comment: VideoComment, index: number) => {
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
			<Stack
				key={comment.id}
				ref={index === comments.length - 1 ? lastCommentRef : null}
				direction="row"
				alignItems="center"
				gap={2}
			>
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

	const memoizedComments = useMemo(() => {
		return [...comments].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);
	}, [comments]);

	if (loading) {
		return <CircularProgressLoader />;
	}

	return (
		<Stack gap={4}>
			<Stack gap={1}>
				<Typography variant="h5">{totalCount} Comments</Typography>
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
			<Stack gap={1.5}>{memoizedComments.map(renderComment)}</Stack>
		</Stack>
	);
};

export default VideoComments;

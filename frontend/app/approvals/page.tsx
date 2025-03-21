'use client';
import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Stack,
	CardMedia,
	Typography,
	Divider,
	Select,
	MenuItem,
	SelectChangeEvent,
	TablePagination,
	Modal,
	Box,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import MainContainer from '@/components/MainContainer';
import CircularProgressLoader from '@/components/CircularProgressLoader';
import EmptyList from '@/components/EmptyList';
import { useAppDispatch } from '@/store/hooks';
import { getAdminVideos } from '@/store/feature/video/action';
import { showToast } from '@/store/feature/toast/slice';
import { videoService } from '@/services/video';
import { getThumbnailUrl } from '@/utils/helper';
import { Video } from '@/types/video';
import '@/styles/pages/Approvals.css';

const page = () => {
	const [videos, setVideos] = useState([] as Video[]);
	const [totalCount, setTotalCount] = useState(0);
	const [isFetchingVideo, setIsFetchingVideo] = useState(false);
	const [openVideoModal, setOpenVideoModal] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const searchParams = useSearchParams();
	const approvalParam = searchParams.get('approval');
	const [approvalType, setApprovalType] = useState(approvalParam ?? 'pending');
	const dispatch = useAppDispatch();
	const router = useRouter();
	const selectOptions = [
		{ label: 'Pending', value: 'pending' },
		{ label: 'Approved', value: 'approved' },
		{ label: 'Rejected', value: 'rejected' },
	];

	useEffect(() => {
		setIsFetchingVideo(true);
		dispatch(
			getAdminVideos({
				approval: ['pending', 'approved', 'rejected'].includes(
					approvalParam ?? '',
				)
					? approvalParam!
					: 'pending',
				limit: rowsPerPage,
			}),
		)
			.unwrap()
			.then((data) => {
				setVideos(data.data.results);
				setTotalCount(data.data?.totalCount || 0);
			})
			.finally(() => setIsFetchingVideo(false));
	}, []);

	const handleSelect = (event: SelectChangeEvent<string>) => {
		setVideos([]);
		setIsFetchingVideo(true);
		setApprovalType(event.target.value);
		const params = new URLSearchParams();
		params.set('approval', event.target.value);

		router.replace(`?${params.toString()}`);
		dispatch(
			getAdminVideos({ approval: event.target.value, limit: rowsPerPage }),
		)
			.unwrap()
			.then((data) => {
				setVideos(data.data.results);
				setTotalCount(data.data?.totalCount || 0);
				setPage(0);
			})
			.finally(() => setIsFetchingVideo(false));
	};

	const handleApprove = async (id: number) => {
		try {
			await videoService.updateVideoApproval({ id, approval: 'approved' });
			const updatedVideos = videos.filter((video) => video.id !== id);
			setVideos(updatedVideos);
		} catch {
			dispatch(
				showToast({ message: 'Failed to update approval', severity: 'error' }),
			);
		}
	};

	const handleReject = async (id: number) => {
		try {
			await videoService.updateVideoApproval({ id, approval: 'rejected' });
			const updatedVideos = videos.filter((video) => video.id !== id);
			setVideos(updatedVideos);
		} catch {
			dispatch(
				showToast({ message: 'Failed to update approval', severity: 'error' }),
			);
		}
	};

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);

		const startIndex = newPage * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;

		if (videos.length < endIndex) {
			setIsFetchingVideo(true);
			dispatch(
				getAdminVideos({
					approval: approvalType,
					limit: rowsPerPage,
					offset: startIndex,
				}),
			)
				.unwrap()
				.then((data) => {
					const newVideos = data.data.results.filter(
						(newVideo) => !videos.some((video) => video.id === newVideo.id),
					);
					setVideos([...videos, ...newVideos]);
					setTotalCount(data.data?.totalCount || 0);
				})
				.finally(() => setIsFetchingVideo(false));
		}
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newRowsPerPage = parseInt(event.target.value, 10);
		setRowsPerPage(newRowsPerPage);
		setPage(0);

		if (videos.length < newRowsPerPage) {
			setIsFetchingVideo(true);
			dispatch(
				getAdminVideos({
					approval: approvalType,
					limit: newRowsPerPage,
					offset: 0,
				}),
			)
				.unwrap()
				.then((data) => {
					setVideos(data.data.results);
					setTotalCount(data.data?.totalCount || 0);
				})
				.finally(() => setIsFetchingVideo(false));
		}
	};

	if (isFetchingVideo && videos.length === 0) {
		return <CircularProgressLoader />;
	}

	return (
		<MainContainer>
			<Stack alignItems="end">
				<Stack direction={'row'} alignItems={'center'} spacing={1}>
					<Typography variant="subtitle1" component="div">
						Approval Type:
					</Typography>
					<Select value={approvalType} onChange={handleSelect}>
						{selectOptions.map((item) => (
							<MenuItem key={item.value} value={item.value}>
								{item.label}
							</MenuItem>
						))}
					</Select>
				</Stack>
			</Stack>
			<Divider className="approval-table-divider" />
			{videos.length === 0 ? (
				<EmptyList type="video" title="No Approval Requests" body="" />
			) : (
				<>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow className="admin-approval-list-thead-row">
									<TableCell className="admin-approval-list-thead-row-cell">
										S. No.
									</TableCell>
									<TableCell className="admin-approval-list-thead-row-cell">
										Video
									</TableCell>
									<TableCell className="admin-approval-list-thead-row-cell"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{videos
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((video, index) => (
										<TableRow key={video.id}>
											<TableCell>{index + page * rowsPerPage + 1}</TableCell>
											<TableCell>
												<Stack
													direction="row"
													spacing={2}
													justifyContent={'start'}
													alignItems={'center'}
												>
													<CardMedia
														className="approval-list-item-card-media"
														component="img"
														image={getThumbnailUrl(video.url)}
														alt={video.name}
														onClick={() => setOpenVideoModal(video.url)}
													/>
													<Typography variant="subtitle1" component="div">
														{video.name}
													</Typography>
												</Stack>
											</TableCell>
											<TableCell>
												<Stack
													direction="row"
													spacing={2}
													justifyContent={'center'}
												>
													{approvalType !== 'approved' && (
														<Button
															variant="contained"
															color="primary"
															onClick={() => handleApprove(video.id)}
														>
															Approve
														</Button>
													)}
													{approvalType !== 'rejected' && (
														<Button
															variant="contained"
															color="error"
															onClick={() => handleReject(video.id)}
														>
															Reject
														</Button>
													)}
												</Stack>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10]}
						component="div"
						count={totalCount}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			)}
			{openVideoModal && (
				<Modal open={!!openVideoModal} onClose={() => setOpenVideoModal(null)}>
					<Box className="video-modal-box">
						<video controls autoPlay className="video-modal-video">
							<source src={openVideoModal} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</Box>
				</Modal>
			)}
		</MainContainer>
	);
};

export default page;

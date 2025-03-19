'use client';
import { useEffect } from 'react';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Container,
	useMediaQuery,
	Theme,
	Stack,
	Avatar,
} from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CircularProgressLoader from '@/components/CircularProgressLoader';
import CreateChannel from '@/components/Channels/CreateChannel';
import EmptyList from '@/components/EmptyList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	getChannels,
	getChannelsByUserId,
} from '@/store/feature/channel/action';
import withAuth from '@/config/withAuth';
import { DefaultChannelAvatar } from '@/assets/image';
import '../../styles/pages/Channel.css';

const page = () => {
	const { channels, isFetchingChannel } = useAppSelector(
		(state) => state.channel,
	);
	const { isLoggedIn } = useAppSelector((state) => state.auth);
	const { collapsed } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const smallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('lg'),
	);
	const searchParams = useSearchParams();
	const isUser = searchParams.get('user');

	useEffect(() => {
		if (isUser) {
			dispatch(
				getChannelsByUserId({
					id: Number(isUser),
				}),
			);
		} else {
			dispatch(getChannels());
		}
	}, [isUser]);

	if (isFetchingChannel) {
		return <CircularProgressLoader />;
	}

	return (
		<Container
			maxWidth={false}
			className={
				smallScreen || collapsed
					? 'page-container-smallscreen'
					: 'page-container'
			}
		>
			{isLoggedIn && <CreateChannel />}
			{channels?.length === 0 && typeof window !== 'undefined' ? (
				<EmptyList
					type="channel"
					title="No Channels available"
					body="Create new channel to get started."
				/>
			) : (
				<Grid container className="w-100" spacing={2}>
					{channels?.map((channel) => (
						<Grid item key={channel.id} xs={12} sm={6} md={4} lg={4} xl={3}>
							<Card key={channel.id} className="channel-list-item-card">
								<Link
									href={`/channels/${channel.id}`}
									className="channel-list-item-card-link"
								>
									<CardContent className="channel-list-item-card-content">
										<Stack gap={0.5} alignItems="center" direction="row">
											<Avatar
												alt={channel.name}
												src={DefaultChannelAvatar.src}
												className="wh-px-50 br-50"
											/>
											<Typography variant="h6" component="div">
												{channel.name}
											</Typography>
										</Stack>
									</CardContent>
								</Link>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
};

export default withAuth(page);

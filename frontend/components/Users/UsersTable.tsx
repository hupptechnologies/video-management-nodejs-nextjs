'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Paper,
	Box,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MoreVert } from '@mui/icons-material';
import CircularProgressLoader from '../CircularProgressLoader';
import { useAppDispatch } from '@/store/hooks';
import { getUsersList } from '@/store/feature/auth/action';
import { AuthResponse } from '@/types/auth';

const UsersTable = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [users, setUsers] = useState<AuthResponse[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [anchorElMap, setAnchorElMap] = useState<
		Record<number, HTMLElement | null>
	>({});
	const dispatch = useAppDispatch();
	const router = useRouter();

	const fetchUsers = async (offset = 0, limit = rowsPerPage) => {
		setIsLoading(true);
		try {
			const data = await dispatch(getUsersList({ offset, limit })).unwrap();
			setUsers(data.data.results);
			setTotalCount(data.data.totalCount);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [rowsPerPage]);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
		const offset = newPage * rowsPerPage;
		fetchUsers(offset);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
		setAnchorElMap((prev) => ({ ...prev, [id]: event.currentTarget }));
	};

	const handleMenuClose = (id: number) => {
		setAnchorElMap((prev) => ({ ...prev, [id]: null }));
	};

	const slicedUsers = useMemo(() => {
		return users.slice(0, rowsPerPage);
	}, [users, rowsPerPage]);

	if (isLoading && users.length === 0) {
		return <CircularProgressLoader marginLeft="0px" width="100%" />;
	}

	return (
		<Box className="users-table-box">
			<Paper elevation={3} className="users-table-paper">
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow className="user-list-thead-row">
								<TableCell className="user-list-thead-row-cell">
									S. No.
								</TableCell>
								<TableCell className="user-list-thead-row-cell">Name</TableCell>
								<TableCell className="user-list-thead-row-cell">
									Email
								</TableCell>
								<TableCell className="user-list-thead-row-cell"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{slicedUsers.map((row, index) => (
								<TableRow key={row.id}>
									<TableCell>{index + 1 + page * rowsPerPage}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.id}</TableCell>
									<TableCell>
										<IconButton
											aria-label="more"
											aria-controls={`menu-${row.id}`}
											aria-haspopup="true"
											onClick={(event) => handleMenuOpen(event, row.id)}
										>
											<MoreVert />
										</IconButton>
										<Menu
											id={`menu-${row.id}`}
											anchorEl={anchorElMap[row.id]}
											open={Boolean(anchorElMap[row.id])}
											onClose={() => handleMenuClose(row.id)}
										>
											<MenuItem
												onClick={() => {
													handleMenuClose(row.id);
													router.push(`/channels?user=${row.id}`);
												}}
											>
												View Channels
											</MenuItem>
										</Menu>
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
			</Paper>
		</Box>
	);
};

export default UsersTable;

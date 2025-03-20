import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import CircularProgressLoader from '../CircularProgressLoader';
import { useAppDispatch } from '@/store/hooks';
import { getUsersList } from '@/store/feature/auth/action';
import { AuthResponse } from '@/types/auth';

const UsersTable = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [users, setUsers] = useState([] as AuthResponse[]);
	const [totalCount, setTotalCount] = useState(0);
	const [isFetchingUsers, setIsFetchingUsers] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsFetchingUsers(true);
		dispatch(
			getUsersList({
				limit: rowsPerPage,
			}),
		)
			.unwrap()
			.then((data) => {
				setUsers(data.data.results);
				setTotalCount(data.data.totalCount);
			})
			.finally(() => setIsFetchingUsers(false));
	}, []);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);

		const startIndex = newPage * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;

		if (users.length < endIndex) {
			setIsFetchingUsers(true);
			dispatch(
				getUsersList({
					limit: rowsPerPage,
					offset: startIndex,
				}),
			)
				.unwrap()
				.then((data) => {
					const newUsers = data.data.results.filter(
						(newUser) =>
							!users.some((existingUser) => existingUser.id === newUser.id),
					);
					setUsers([...users, ...newUsers]);
					setTotalCount(data.data.totalCount);
				})
				.finally(() => setIsFetchingUsers(false));
		}
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newRowsPerPage = parseInt(event.target.value, 10);
		setRowsPerPage(newRowsPerPage);
		setPage(0);

		if (users.length < newRowsPerPage) {
			setIsFetchingUsers(true);
			dispatch(
				getUsersList({
					limit: newRowsPerPage,
					offset: 0,
				}),
			)
				.unwrap()
				.then((data) => {
					setUsers(data.data.results);
					setTotalCount(data.data.totalCount);
				})
				.finally(() => setIsFetchingUsers(false));
		}
	};

	if (isFetchingUsers && users.length === 0) {
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
							</TableRow>
						</TableHead>
						<TableBody>
							{users
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => (
									<TableRow key={index}>
										<TableCell>{index + page * rowsPerPage + 1}</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.email}</TableCell>
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

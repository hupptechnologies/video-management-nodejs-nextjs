import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
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
	const [isFetchingUsers, setIsFetchingUsers] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsFetchingUsers(true);
		dispatch(getUsersList({}))
			.unwrap()
			.then((data) => {
				setUsers(data.data.results);
			})
			.finally(() => setIsFetchingUsers(false));
	}, []);

	if (isFetchingUsers) {
		return <CircularProgressLoader />;
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
			</Paper>
		</Box>
	);
};

export default UsersTable;

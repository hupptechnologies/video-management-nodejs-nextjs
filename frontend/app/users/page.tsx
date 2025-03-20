'use client';
import React from 'react';
import MainContainer from '@/components/MainContainer';
import UsersTable from '@/components/Users/UsersTable';
import withAdminAuth from '@/config/withAdminAuth';
import '@/styles/pages/Users.css';

const page = () => {
	return (
		<MainContainer>
			<UsersTable />
		</MainContainer>
	);
};

export default withAdminAuth(page);

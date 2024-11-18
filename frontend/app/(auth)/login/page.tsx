"use client";
import  React, { useEffect, useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Grid, Box, Typography, Container, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/feature/auth/action';
import { validateEmail } from '@/utils/helper';
import { LinkStyle } from '@/styles/common';

export default function Login () {

	const [emailError, setEmailError] = useState('');
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const {
		authLoading, isLoggedIn
	} = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(()=> {
		if(isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateEmail(formData.email) || formData.email === '') {
			setEmailError('');
		} else {
			setEmailError('Invalid email address');
			return;
		}
		const registerData = {
			email: formData.email,
			password: formData.password
		};
		dispatch(login(registerData))
			.unwrap()
			.then(() => {
				router.push('/');
			});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
		setEmailError('');
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
                    Login
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{
					mt: 1
				}}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={formData.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
						autoFocus
					/>
					{emailError && (
						<p style={{
							color: 'red',
							margin: '5px 0'
						}}>{emailError}</p>
					)}
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={formData.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					{authLoading
						? <Box sx={{
							alignItems: 'center',
							justifyContent: 'center',
							display: 'flex'
						}}>
							<CircularProgress />
						</Box>
						: <Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2
							}}
						>
                        Log In
						</Button>}
					<Grid container>
						<Grid item xs>
							<Link style={LinkStyle} href="/#" passHref>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link style={LinkStyle} href="/signup" passHref>
								{"Don't"} have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

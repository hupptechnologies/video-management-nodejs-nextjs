"use client";
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, CircularProgress, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register } from '@/store/feature/auth/action';
import { validateEmail, validatePassword } from '@/utils/helper';
import { LinkStyle } from '@/styles/common';

export default function SignUp () {

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const {
		authLoading, isLoggedIn
	} = useAppSelector(state => state.auth);
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(()=> {
		if(isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setPasswordError(
			validatePassword(formData.password) ? '' : 'Password length must be between 8 and 16 characters'
		);
		setEmailError(
			validateEmail(formData.email)
				? ''
				: 'Invalid email address'
		);
		if (validatePassword(formData.password) && validateEmail(formData.email)) {
			const registerData = {
				email: formData.email,
				password: formData.password,
				name: formData.firstName + ' ' + formData.lastName
			};
			dispatch(register(registerData))
				.unwrap()
				.then(() => {
					router.push('/login');
				});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailError('');
		setPasswordError('');
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Card
					key={'signup-form-card'}
					sx={{
						boxShadow: '0px 4px 20px rgba(0, 167, 111, 0.16)',
						transition: 'transform 0.3s ease',
						padding:'24px'
					}}
				>
					<Typography component="h1" variant="h5">
          Sign up
					</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{
						mt: 1
					}}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<TextField
									margin="normal"
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									value={formData.firstName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									margin="normal"
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									value={formData.lastName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
								/>
							</Grid>
						</Grid>
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
						{passwordError && (
							<p style={{
								color: 'red',
								margin: '5px 0'
							}}>{passwordError}</p>
						)}
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
                       Sign Up
							</Button>}
						<Link style={LinkStyle} href={'/login'} passHref>
                          Already have an account? Login
						</Link>
					</Box>
				</Card>
			</Box>
		</Container>
	);
}

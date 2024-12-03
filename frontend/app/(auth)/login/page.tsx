"use client";
import  React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Container,
	CircularProgress,
	Card,
	InputAdornment,
	IconButton
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/feature/auth/action';
import { loginSchema } from '@/lib/yup/schema';
import { LinkStyle } from '@/styles/common';

export default function Login () {

	const initialErrorState = {
		email: ''
	};
	const [error, setError] = useState(initialErrorState);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
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
		try {
			await loginSchema.validate(formData, {
				abortEarly: false
			});
			const registerData = {
				email: formData.email,
				password: formData.password
			};
			dispatch(login(registerData))
				.unwrap()
				.then(() => {
					router.push('/');
				});
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors: any = {
				};
				err.inner.forEach((error) => {
					if(error.path !== undefined) {
						errors[error.path] = error.message;
					}
				});
				setError(errors);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
		setError(initialErrorState);
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
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
					key={'login-form-card'}
					sx={{
						boxShadow: '0px 4px 20px rgba(0, 167, 111, 0.16)',
						transition: 'transform 0.3s ease',
						padding:'24px'
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
							error={!!error.email}
							helperText={error.email && 'Invalid email address'}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							value={formData.password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={togglePasswordVisibility}
											edge="end"
											aria-label="toggle password visibility"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
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
				</Card>
			</Box>
		</Container>
	);
}

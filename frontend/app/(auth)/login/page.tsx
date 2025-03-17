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
import { adminLogin, login } from '@/store/feature/auth/action';
import { loginSchema } from '@/lib/yup/schema';
import '../../../styles/pages/Auth.css';

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
	const [isAdminLogin, setIsAdminLogin] = useState(false);
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
			if(isAdminLogin) {
				dispatch(adminLogin(registerData))
					.unwrap()
					.then(() => {
						router.push('/');
					});
			} else{
				dispatch(login(registerData))
					.unwrap()
					.then(() => {
						router.push('/');
					});
			}
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
			<Box className='auth-page-main-container'>
				<Card
					key='login-form-card'
					className='auth-page-main-card'
				>
					<Typography component="h1" variant="h5">
                    Login
					</Typography>
					<Box component="form" onSubmit={handleSubmit} mt={1} >
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
							control={<Checkbox onChange={() => setIsAdminLogin(prevState => !prevState)} value={isAdminLogin} color="primary" />}
							label="Log in as Admin"
						/>
						{authLoading
							? <Box className='center-flex-box'>
								<CircularProgress />
							</Box>
							: <Button
								type="submit"
								fullWidth
								variant="contained"
								className='login-signup-btn'
							>
                        Log In
							</Button>}
						<Grid container>
							<Grid item xs>
								<Link className='next-link-custom-style' href="/#" passHref>
								Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link className='next-link-custom-style' href="/signup" passHref>
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Card>
			</Box>
		</Container>
	);
}

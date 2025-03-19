'use client';
import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Container,
	CircularProgress,
	Card,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register } from '@/store/feature/auth/action';
import { signUpSchema } from '@/lib/yup/schema';
import '../../../styles/pages/Auth.css';

export default function SignUp() {
	const initialErrorState = {
		firstName: '',
		email: '',
		password: '',
	};
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState(initialErrorState);
	const [passwordError, setPasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { authLoading, isLoggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await signUpSchema.validate(formData, {
				abortEarly: false,
			});
			const registerData = {
				email: formData.email,
				password: formData.password,
				name: formData.lastName
					? formData.firstName + ' ' + formData.lastName
					: formData.firstName,
			};
			dispatch(register(registerData))
				.unwrap()
				.then(() => {
					router.push('/login');
				});
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors: any = {};
				err.inner.forEach((error) => {
					if (error.path !== undefined) {
						errors[error.path] = error.message;
					}
				});
				setError(errors);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(initialErrorState);
		setPasswordError('');
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box className="auth-page-main-container">
				<Card key="signup-form-card" className="auth-page-main-card">
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" onSubmit={handleSubmit} mt={1}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									value={formData.firstName}
									error={!!error.firstName}
									helperText={error.firstName && error.firstName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleChange(e)
									}
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
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleChange(e)
									}
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
							error={!!error.email}
							helperText={error.email && error.email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange(e)
							}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? 'text' : 'password'}
							id="password"
							autoComplete="current-password"
							value={formData.password}
							error={!!error.password}
							helperText={error.password && error.password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange(e)
							}
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
						{passwordError && (
							<p className="signup-password-error">{passwordError}</p>
						)}
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						{authLoading ? (
							<Box className="center-flex-box">
								<CircularProgress />
							</Box>
						) : (
							<Button
								type="submit"
								fullWidth
								variant="contained"
								className="login-signup-btn"
							>
								Sign Up
							</Button>
						)}
						<Link className="next-link-custom-style" href="/login" passHref>
							Already have an account? Login
						</Link>
					</Box>
				</Card>
			</Box>
		</Container>
	);
}

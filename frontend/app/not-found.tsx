"use client";

import { Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import '../styles/pages/NotFound.css';

const NotFoundPage = () => {
	return (
		<div className='not-found-main-container'
		>
			<Typography
				variant="h1" fontSize={'8rem'} fontWeight={700}
				className="error-404-text"
			>
                404
			</Typography>
			<Typography
				variant="h6" mb={2}
			>
                Oops! Page not found
			</Typography>
			<Typography
				variant="body1"
				mb={4}
			>
                Sorry, the page you’re looking for doesn’t exist. It might have been removed or you may have entered the wrong URL.
			</Typography>
			<Stack direction="row" spacing={2}>
				<Link href="/" style={{
					textDecoration: "none"
				}}>
					<Button
						variant="contained"
						className="back-to-home-btn"
					>
                        Back to Home
					</Button>
				</Link>
			</Stack>
		</div>
	);
};

export default NotFoundPage;

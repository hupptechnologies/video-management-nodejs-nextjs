"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: 'calc(100vh - 64px)',
				textAlign: "center",
				flexDirection: "column",
				padding: 3,
			}}
		>
			<Typography
				variant="h1"
				sx={{
					fontSize: {
						xs: "5rem",
						sm: "8rem"
					},
					fontWeight: 700,
				}}
			>
                404
			</Typography>
			<Typography
				variant="h6"
				sx={{
					marginBottom: 2,
					fontWeight: 500,
				}}
			>
                Oops! Page not found
			</Typography>
			<Typography
				variant="body1"
				sx={{
					marginBottom: 4,
				}}
			>
                Sorry, the page you’re looking for doesn’t exist. It might have been removed or you may have entered the wrong URL.
			</Typography>
			<Stack direction="row" spacing={2}>
				<Link href="/" style={{
					textDecoration: "none"
				}}>
					<Button
						variant="contained"
						sx={{
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
                        Back to Home
					</Button>
				</Link>
			</Stack>
		</Box>
	);
};

export default NotFoundPage;

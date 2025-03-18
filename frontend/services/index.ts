import axios, { AxiosInstance } from 'axios';

export const BackendAuthenticatedService: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
});

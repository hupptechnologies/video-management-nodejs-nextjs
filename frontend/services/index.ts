import axios, { AxiosInstance } from 'axios';

export const BackendAuthenticatedService: AxiosInstance = axios.create({
	baseURL: 'http://0.0.0.0:4001/api/'
});

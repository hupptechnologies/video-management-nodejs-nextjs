import axios, { AxiosInstance, AxiosResponse, ResponseType } from 'axios';
import { BackendAuthenticatedService } from '.';
import { appLocalStorage } from '@/utils/helper';

BackendAuthenticatedService.interceptors.request.use((config) => {
	const accessToken = appLocalStorage.getItem('token');
	if (accessToken) {
		config.headers['token'] = accessToken;
	}
	return config;
});


const refreshAccessToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken');

	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/refresh-token`,
			{
			},
			{
				headers: {
					'refresh-token': refreshToken,
				},
			}
		);

		localStorage.setItem('token', response.headers?.token);

		return response.headers?.token;
	} catch (error) {
		console.error('Refresh token failed:', error);
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		window.location.href = '/login';
		throw error;
	}
};

BackendAuthenticatedService.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && error.response.data.message === "Token expired" && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await refreshAccessToken();

				return BackendAuthenticatedService(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

type HeadersProps = {
	[key: string]: string;
};

interface APIParamsType {
	method: 'get' | 'post' | 'put' | 'delete';
	route: string;
	body?: object;
	isAuthenticated?: boolean;
	params?: object;
	headers?: HeadersProps;
	responseType?: ResponseType;
}

/**
 * Get an Axios instance based on authentication and request parameters.
 * @param isAuthenticated - Whether the request is authenticated.
 * @param headersProps - Custom headers for the request.
 * @param params - Request parameters.
 * @param cancelToken - Token for cancelling the request.
 * @returns Axios instance.
 */
function getInstance ({
	isAuthenticated = false,
	headersProps = {
	},
	params,
}: {
	isAuthenticated?: boolean;
	headersProps?: HeadersProps;
	params?: object;
}): AxiosInstance {
	const instance = isAuthenticated
		? BackendAuthenticatedService
		: axios.create({
			baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
		});

	// Set common headers and default params
	instance.defaults.headers.common = headersProps;
	instance.defaults.params = params;

	return instance;
}
/**
 * Make an API call using Axios.
 * @param method - HTTP method (get, post, put, delete).
 * @param route - Request route.
 * @param body - Request body for POST and PUT.
 * @param isAuthenticated - Whether the request is authenticated.
 * @param params - Request parameters.
 * @returns Promise containing Axios response.
 */
function callAPI<T> ({
	method,
	route,
	body,
	isAuthenticated = false,
	params,
	responseType,
}: APIParamsType): Promise<AxiosResponse<T>> {
	const instance = getInstance({
		isAuthenticated,
		params
	});
	// Use the provided responseType if it's defined
	if (responseType) {
		instance.defaults.responseType = responseType;
	}
	switch (method) {
	case 'get':
	case 'delete':
		return instance[method]<T>(route, body);
	case 'post':
	case 'put':
		return instance[method]<T>(route, body);
	default:
		throw new Error(`Invalid HTTP method: ${method}`);
	}
}

/**
 * Object containing methods for making API requests.
 */
export const HTTP = {
	/**
	 * Make a GET request.
	 */
	Get: <T>(params: Omit<APIParamsType, 'method'>, isAuthenticated = true) => callAPI<T>({
		...params,
		method: 'get',
		isAuthenticated
	}),

	/**
	 * Make a POST request.
	 */
	Post: <T>(params: Omit<APIParamsType, 'method'>, isAuthenticated = true) => callAPI<T>({
		...params,
		method: 'post',
		isAuthenticated
	}),

	/**
	 * Make a PUT request.
	 */
	Put: <T>(params: Omit<APIParamsType, 'method'>, isAuthenticated = true) => callAPI<T>({
		...params,
		method: 'put',
		isAuthenticated
	}),

	/**
	 * Make a DELETE request.
	 */
	Delete: <T>(params: Omit<APIParamsType, 'method'>, isAuthenticated = true) => callAPI<T>({
		...params,
		method: 'delete',
		isAuthenticated
	}),
};

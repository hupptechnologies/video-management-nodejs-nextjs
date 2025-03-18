import { DefaultParams } from "@/types/common";
import { HTTP } from "./http";
import { AuthRequest, AuthResponse, UserListResponse } from "@/types/auth";

type AxiosResponse = {
        data: AuthResponse,
        message: string
};

class AuthService {

	register (data: AuthRequest) {
		return HTTP.Post<AxiosResponse>({
			route: 'auth/register',
			body: data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	login (data: AuthRequest) {
		return HTTP.Post<AxiosResponse>({
			route: 'auth/login',
			body: data,
			headers: {
				"Content-Type": "application/json",
			}
		});
	}

	adminLogin (data: AuthRequest) {
		return HTTP.Post<AxiosResponse>({
			route: 'auth/admin/login',
			body: data,
			headers: {
				"Content-Type": "application/json",
			}
		});
	}

	user () {
		return HTTP.Get<AxiosResponse>({
			route: 'auth/user',
			headers: {
				"Content-Type": "application/json",
			}
		});
	}

	userList (data?: DefaultParams) {
		return HTTP.Get<UserListResponse>({
			route: 'auth/user/list',
			headers: {
				"Content-Type": "application/json",
			},
			params:{
				...(data?.limit && {
					limit: data.limit || 10
				}),
				...(data?.offset && {
					offset: data.offset || 0
				}),
				...(data?.search && {
					search: data.search || ''
				}),
			}
		});
	}
}

export const authService = new AuthService();

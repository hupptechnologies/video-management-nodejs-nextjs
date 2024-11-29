import { AxiosHeaders } from "axios";
import { HTTP } from "./http";
import { AuthRequest, AuthResponse } from "@/types/auth";

type AxiosResponse = {
    data: {
        data: AuthResponse,
        message: string
    },
    headers: AxiosHeaders
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

	user () {
		return HTTP.Get<AxiosResponse>({
			route: 'auth/user',
			headers: {
				"Content-Type": "application/json",
			}
		});
	}
}

export const authService = new AuthService();

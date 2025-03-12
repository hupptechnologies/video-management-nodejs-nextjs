import { Optional } from ".";

export interface AuthRequest {
    email: string;
    password: string;
    name?: string;
}

export interface AuthResponse {
    id: number;
    email: string;
    name?: string;
    role?: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    token: string;
    refreshToken: string;
    authLoading: boolean;
    user: Optional<AuthResponse>;
    isAdmin: boolean;
}

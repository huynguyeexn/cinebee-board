import { Employee } from '.';

export interface UserLogin {
	username: string;
	password: string;
}

export interface WebToken {
	access_token: string;
	expires_at: number;
	expires_in: number;
	token_type: string;
}

export interface UserToken extends WebToken {
	user: Employee;
}

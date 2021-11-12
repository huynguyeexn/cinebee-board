import { Employee, UserToken } from 'app/interfaces';
import { UserLogin } from 'app/interfaces/account';
import { ListResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/accounts/admin';

const accountApi = {
	login(params: UserLogin): Promise<UserToken> {
		const url = `${endpoint}/login`;
		return axiosClient.post(url, params);
	},
	getUser(): Promise<ListResponse<Employee>> {
		const url = `${endpoint}/me`;
		return axiosClient.get(url);
	},
	logout(): Promise<any> {
		const url = `${endpoint}/logout`;
		return axiosClient.get(url);
	},
};

export default accountApi;

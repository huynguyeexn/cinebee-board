import accountApi from 'app/api/accountApi';
import { UserLogin, UserToken } from 'app/interfaces';
import moment from 'moment';
import { localStorageGetItem } from './LocalStorage';
import { ToastError } from './Toast';

export const getToken = () => {
	const token = localStorageGetItem('cinebee-board') as UserToken | null;
	if (token && moment().isAfter(moment.unix(token.expires_at))) {
		window.localStorage.removeItem('cinebee-board');
		return null;
	} else {
		return token;
	}
};

export const setToken = (token: UserToken) => {
	window.localStorage.removeItem('cinebee-board');
	window.localStorage.setItem('cinebee-board', JSON.stringify(token));
};

export const getCurrentUser = () => {
	return getToken()?.user;
};

export const getAccessToken = () => {
	return getToken()?.access_token;
};

export const login = async (params: UserLogin) => {
	try {
		const response: UserToken = await accountApi.login(params);
		setToken(response);
		return true;
	} catch (error) {
		ToastError('Sai tai khoan hoac mat khau');
		return false;
	}
};

export const logout = () => {
	if (getToken()) {
		window.localStorage.removeItem('cinebee-board');
	}
	return (window.location.href = '/login');
};

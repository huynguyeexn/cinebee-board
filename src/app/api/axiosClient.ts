import { HandleAxiosError } from 'app/utils/HandleError';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL_API,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

axiosClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		console.log(`config`, config);
		let newConfig = config;
		newConfig.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('cinebee-board') || 'null')?.access_token
		}`;
		return config;
	},
	function (error: AxiosError) {
		HandleAxiosError(error);
		return error;
	}
);

axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		return response.data;
	},
	function (error: AxiosError) {
		HandleAxiosError(error);
		return Promise.reject(error);
	}
);

export default axiosClient;

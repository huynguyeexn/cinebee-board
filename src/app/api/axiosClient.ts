import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL_API,
	headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

axiosClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		return config;
	},
	function (error: AxiosError) {
		return error;
	}
);

axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		const { data, ...rest } = response.data;
		return {
			data: data,
			pagination: rest,
		};
	},
	function (error: AxiosError) {
		return Promise.reject(error);
	}
);

export default axiosClient;

import { Movie } from '../interfaces/movie';
import { ListParams, ListResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const movieApi = {
	getAll(params?: ListParams): Promise<ListResponse<Movie>> {
		const url = '/movies';
		return axiosClient.get(url, { params });
	},
	getById(params?: ListParams): Promise<ListResponse<Movie>> {
		const url = '/movies';
		return axiosClient.get(url, { params });
	},
	// Add
	// Edit
	// Delete
};

export default movieApi;

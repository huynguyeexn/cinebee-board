import { Movie } from '../interfaces/movie';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/movies';

const movieApi = {
	getAll(params?: ListParams): Promise<ListResponse<Movie>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(params?: ListParams): Promise<ListResponse<Movie>> {
		return axiosClient.get(endpoint, { params });
	},
	// Add
	// Edit
	// Delete
	deleteById(params: Movie): Promise<SuccessResponse<Movie>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default movieApi;

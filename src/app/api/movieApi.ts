import { Movie } from '../interfaces/movie';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/movies';

const movieApi = {
	getAll(params?: ListParams): Promise<ListResponse<Movie>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(id: string): Promise<Movie> {
		const url = `${endpoint}/${id}`;
		return axiosClient.get(url);
	},
	// Add
	create(data: Movie): Promise<Movie> {
		return axiosClient.post(endpoint, data);
	},

	// Edit
	update(data: Movie): Promise<Movie> {
		const url = `${endpoint}/${data.id}`;
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Movie): Promise<SuccessResponse<Movie>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default movieApi;

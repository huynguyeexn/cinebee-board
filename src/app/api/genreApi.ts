import { Genre } from '../interfaces';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/genres';

const genreApi = {
	getAll(params?: ListParams): Promise<ListResponse<Genre>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(params: Genre): Promise<Genre> {
		const url = `${endpoint}/${params.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Genre): Promise<Genre> {
		return axiosClient.post(endpoint, data);
	},

	// Update
	update(data: Genre): Promise<Genre> {
		const url = `${endpoint}/${data.id}`;
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Genre): Promise<SuccessResponse<Genre>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default genreApi;

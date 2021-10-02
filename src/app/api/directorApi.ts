import { Director } from '../interfaces';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/directors';

const directorApi = {
	getAll(params?: ListParams): Promise<ListResponse<Director>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(params: Director): Promise<Director> {
		const url = `${endpoint}/${params.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Director): Promise<Director> {
		return axiosClient.post(endpoint, data);
	},

	// Update
	update(data: Director): Promise<Director> {
		const url = `${endpoint}/${data.id}`;
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Director): Promise<SuccessResponse<Director>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default directorApi;

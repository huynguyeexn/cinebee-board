import { Actor } from '../interfaces';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/actors';

const actorApi = {
	getAll(params?: ListParams): Promise<ListResponse<Actor>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(params: Actor): Promise<Actor> {
		const url = `${endpoint}/${params.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Actor): Promise<Actor> {
		return axiosClient.post(endpoint, data);
	},

	// Update
	update(data: Actor): Promise<Actor> {
		const url = `${endpoint}/${data.id}`;
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Actor): Promise<SuccessResponse<Actor>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default actorApi;

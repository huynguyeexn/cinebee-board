
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';
import { Permission } from '../interfaces';

const endpoint = '/permission';

const permissionApi = {
	getAll(params?: ListParams): Promise<ListResponse<Permission>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(params: Permission): Promise<Permission> {
		const url = `${endpoint}/${params.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Permission): Promise<Permission> {
		return axiosClient.post(endpoint, data);
	},

	// Update
	update(data: Permission): Promise<Permission> {
		const url = `${endpoint}/${data.id}`;
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Permission): Promise<SuccessResponse<Permission>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default permissionApi;
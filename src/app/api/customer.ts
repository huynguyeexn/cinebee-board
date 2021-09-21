import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import { Customer } from '../interfaces/customer';
import axiosClient from './axiosClient';

const path = '/customers';

const customerApi = {
	getAll(params?: ListParams): Promise<ListResponse<Customer>> {
		return axiosClient.get(path, { params });
	},
	getById(params?: ListParams): Promise<ListResponse<Customer>> {
		return axiosClient.get(path, { params });
	},
	// Add
	// Edit
	// Delete
	deleteById(params: Customer): Promise<SuccessResponse<Customer>> {
		const url = `${path}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default customerApi;

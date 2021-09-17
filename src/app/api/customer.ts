import { Customer } from '../interfaces/customer';
import { ListParams, ListResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const customerApi = {
	getAll(params?: ListParams): Promise<ListResponse<Customer>> {
		const url = '/customers';
		return axiosClient.get(url, { params });
	},
	getById(params?: ListParams): Promise<ListResponse<Customer>> {
		const url = '/customers';
		return axiosClient.get(url, { params });
	},
	// Add
	// Edit
	// Delete
};

export default customerApi;

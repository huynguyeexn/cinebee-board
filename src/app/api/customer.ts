import { parseElementObjectToUTC } from 'app/utils/helper';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import { Customer } from '../interfaces/customer';
import axiosClient from './axiosClient';

const endpoint = '/customers';

const customerApi = {
	// Show
	getAll(params?: ListParams): Promise<ListResponse<Customer>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(data: Customer): Promise<Customer> {
		const url = `${endpoint}/${data.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Customer): Promise<Customer> {
		return axiosClient.post(endpoint, data);
	},

	// Update
	update(data: Customer): Promise<Customer> {
		const url = `${endpoint}/${data.id}`;
		console.log(`update data`, data);
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Customer): Promise<SuccessResponse<Customer>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default customerApi;

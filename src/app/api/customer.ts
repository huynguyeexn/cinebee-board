import { parseElementObjectToUTC } from 'app/utils/helper';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import { Customer } from '../interfaces/customer';
import axiosClient from './axiosClient';

const path = '/customers';

const customerApi = {
	// Show
	getAll(params?: ListParams): Promise<ListResponse<Customer>> {
		return axiosClient.get(path, { params });
	},
	getById(data: Customer): Promise<Customer> {
		const url = `${path}/${data.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Customer): Promise<Customer> {
		data = parseElementObjectToUTC(data, 'birthday') as Customer;
		return axiosClient.post(path, data);
	},

	// Update
	update(data: Customer): Promise<Customer> {
		const url = `${path}/${data.id}`;
		data = parseElementObjectToUTC(data, 'birthday') as Customer;

		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: Customer): Promise<SuccessResponse<Customer>> {
		const url = `${path}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default customerApi;

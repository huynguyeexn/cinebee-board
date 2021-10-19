import { CustomerType, ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import axiosClient from './axiosClient';

const path = '/customer-types';

const customerTypeApi = {
	getAll(): Promise<ListResponse<CustomerType>> {
		return axiosClient.get(path);
	},

	getList(params?: ListParams): Promise<ListResponse<CustomerType>> {
		return axiosClient.get(path, {params});
	},

	getById(data: CustomerType): Promise<CustomerType>{
		const url = `${path}/${data.id}`;
		return axiosClient.get(url);
	},

	create(data: CustomerType): Promise<CustomerType>{
		return axiosClient.post(path, data);
	},

	update(data: CustomerType): Promise<CustomerType>{
		const url = `${path}/${data.id}`;
		return axiosClient.put(url, data)
	},

	deleteById(data: CustomerType): Promise<SuccessResponse<CustomerType>>{
		const url = `${path}/${data.id}/delete`;
		return axiosClient.delete(url);
	}
};

export default customerTypeApi;

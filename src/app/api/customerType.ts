import { CustomerType, ListResponse } from 'app/interfaces';
import axiosClient from './axiosClient';

const path = '/customer-types';

const customerTypeApi = {
	getAll(): Promise<ListResponse<CustomerType>> {
		return axiosClient.get(path);
	},
};

export default customerTypeApi;

import { ListParams, ListResponse } from '../interfaces/common';
import axiosClient from './axiosClient';
import { Employee } from '../interfaces/employee';

const employeeApi = {
	getAll(params?: ListParams): Promise<ListResponse<Employee>> {
		const url = '/employee';
		return axiosClient.get(url, { params });
	},
	getById(params?: ListParams): Promise<ListResponse<Employee>> {
		const url = '/employee';
		return axiosClient.get(url, { params });
	},
	// Add
	// Edit
	// Delete
};

export default employeeApi;

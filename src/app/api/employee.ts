import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';
import { Employee } from '../interfaces/employee';

const path = '/employee';

const employeeApi = {
	getAll(params?: ListParams): Promise<ListResponse<Employee>> {
		return axiosClient.get(path, { params });
	},
	getById(employee: Employee): Promise<Employee> {
		const url = `${path}/${employee.id}`;
		return axiosClient.get(url);
	},
	// Add
	// Edit
	// Delete
	deleteById(params: Employee): Promise<SuccessResponse<Employee>> {
		const url = `${path}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default employeeApi;
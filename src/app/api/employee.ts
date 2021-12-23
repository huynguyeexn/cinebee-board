import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';
import { Employee } from '../interfaces/employee';
import { parseElementObjectToUTC } from 'app/utils/helper';

const path = '/employee';

const employeeApi = {
	getAll(): Promise<ListResponse<Employee>> {
		const url = `${path}/all`;
		return axiosClient.get(url);
	},

	getList(params?: ListParams): Promise<ListResponse<Employee>> {
		return axiosClient.get(path, { params });
	},

	getById(employee: Employee): Promise<Employee> {
		const url = `${path}/${employee.id}`;
		return axiosClient.get(url);
	},

	// Add
	create(data: Employee): Promise<Employee> {
		data = parseElementObjectToUTC(data, 'birthday') as Employee;
		return axiosClient.post(path, data);
	},

	// Update
	update(data: Employee): Promise<Employee> {
		const url = `${path}/${data.id}`;
		data = parseElementObjectToUTC(data, 'birthday') as Employee;

		return axiosClient.put(url, data);
	},
	// Delete
	deleteById(params: Employee): Promise<SuccessResponse<Employee>> {
		const url = `${path}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default employeeApi;

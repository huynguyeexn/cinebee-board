import { ListResponse, EmployeeRole, ListParams, Permissions } from 'app/interfaces';
import axiosClient from './axiosClient';

const path = '/role';

const employeeRoleApi = {
	getAll(): Promise<ListResponse<EmployeeRole>> {
		return axiosClient.get(path);
	},

	getById(params: EmployeeRole): Promise<EmployeeRole> {
		const url = `${path}/${params.id}`;
		return axiosClient.get(url);
	},

	getList(params?: ListParams): Promise<ListResponse<EmployeeRole>> {
		return axiosClient.get(path, { params });
	},

	getAllPermissions(): Promise<ListResponse<Permissions>> {
		const url = `${path}/permissions`;
		return axiosClient.get(url);
	},

	// Add
	create(data: EmployeeRole): Promise<EmployeeRole> {
		return axiosClient.post(path, data);
	},

	// Edit
	update(data: EmployeeRole): Promise<EmployeeRole> {
		const url = `${path}/${data.id}`;
		return axiosClient.put(url, data);
	},

	// Delete
	deleteById(params: EmployeeRole): Promise<EmployeeRole> {
		const url = `${path}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default employeeRoleApi;

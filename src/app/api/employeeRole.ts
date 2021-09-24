import { ListResponse, EmployeeRole  } from "app/interfaces";
import axiosClient from "./axiosClient";


const path = '/employee-roles';

const employeeRoleApi = {
	getAll(): Promise<ListResponse<EmployeeRole>> {
		return axiosClient.get(path);
	},
};

export default employeeRoleApi;

import { ListResponse, Permission, permission_role, Role,SuccessResponse } from "app/interfaces";
import axiosClient from "./axiosClient";


const endpoint = 'permission';

const roleApi = {
    // getAll(): Promise<ListResponse<Permission>> {
    //     return axiosClient.get(endpoint);
    // },
    getAllPermission_Role(): Promise<ListResponse<permission_role>>{
       const url = `${endpoint}/permission_role`;
       return axiosClient.get(url);
    },
    getListPermission(): Promise<ListResponse<Permission>>{
        return axiosClient.get(endpoint);
    },
    //Thêm mới
    create(data: any): Promise<any>{
        return axiosClient.post(endpoint,data);
    },
    getById(id: any): Promise<any> {
		const url = `${endpoint}/${id}`;
		return axiosClient.get(url);
	},
    // cập nhật
    update(data: any): Promise<any>{
        const url = `${endpoint}/${data.role}`;
        return axiosClient.put(url, data);
    },
    // Delete
	deleteById(params: Role): Promise<SuccessResponse<Role>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
}


export default roleApi;


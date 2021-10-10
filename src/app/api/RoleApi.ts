import { ListParams, ListResponse, Permission, Role,SuccessResponse } from "app/interfaces";
import axiosClient from "./axiosClient";


const endpoint = 'role';

const roleApi = {
    getAll(params?: ListParams): Promise<ListResponse<Role>> {
        return axiosClient.get(endpoint, {params});
    },
    getAllPermission(params?: ListParams): Promise<ListResponse<Permission>>{
       const url = `${endpoint}/permission`;
       return axiosClient.get(url);
    },
    //Thêm mới
    create(data: any): Promise<any>{
        return axiosClient.post(endpoint,data);
    },
    getById(id: string): Promise<any> {
		const url = `${endpoint}/${id}`;
		return axiosClient.get(url);
	},
    // cập nhật
    update(data: any): Promise<any>{
        const url = `${endpoint}/${data.id}`;
        return axiosClient.put(url, data);
    },
    // Delete
	deleteById(params: Role): Promise<SuccessResponse<Role>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
}


export default roleApi;


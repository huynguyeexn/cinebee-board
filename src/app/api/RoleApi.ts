import { ListParams, ListResponse, Permission, Role } from "app/interfaces";
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
    }
}


export default roleApi;


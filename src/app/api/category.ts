import { ListParams, ListResponse, SuccessResponse } from "app/interfaces"
import { Category } from "app/interfaces/category"
import axiosClient from "./axiosClient"

const endpoint = '/categories'

const categoryApi = {

    getAll(params?: ListParams): Promise<ListResponse<Category>> {
        return axiosClient.get(endpoint,{params});
    },
    getAll_N(): Promise<ListResponse<Category>> {
        const url = `${endpoint}/all`;
        return axiosClient.get(url)
    },
    getById(params: Category): Promise<Category> {
        const url = `${endpoint}/${params.id}`
        return axiosClient.get(url)
    },

    create(data: Category): Promise<Category> {
        return axiosClient.post(endpoint, data);
    },

    update(data: Category): Promise<Category> {
        const url = `${endpoint}/${data.id}`
        return axiosClient.put(url, data)
    },
    
    deleteById(params: Category): Promise<SuccessResponse<Category>> {
        const url = `${endpoint}/${params.id}/delete`;
        return axiosClient.delete(url)
    }
}

export default categoryApi;
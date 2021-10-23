import { Combo } from "../interfaces";
import { ListParams, ListResponse, SuccessResponse } from "../interfaces/common";
import axiosClient from "./axiosClient";

const endpoint = '/combo';

const comboApi = {
    getAll(params?: ListParams): Promise<ListResponse<Combo>> {
        return axiosClient.get(endpoint, { params });
    },
    getById(id: string): Promise<Combo> {
        const url = `${endpoint}/${id}`;
        return axiosClient.get(url);
    },

    create(data: Combo): Promise<Combo> {
        return axiosClient.post(endpoint, data);
    },

    update(data: Combo): Promise<Combo> {
        const url = `${endpoint}/${data.id}`;
        return axiosClient.put(url, data);
    },


    deleteById(params: Combo): Promise<SuccessResponse<Combo>> {
        const url = `${endpoint}/${params.id}/delete`;
        return axiosClient.delete(url);
    },
};

export default comboApi;
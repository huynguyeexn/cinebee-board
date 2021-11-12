import { Item } from "../interfaces";
import { ListParams, ListResponse, SuccessResponse } from "../interfaces/common";
import axiosClient from "./axiosClient";

const endpoint = '/items';

const itemApi = {
    getAll(params?: ListParams): Promise<ListResponse<Item>> {
        return axiosClient.get(endpoint, { params });
    },

    getById(params: Item): Promise<Item> {
        const url = `${endpoint}/${params.id}`;
        return axiosClient.get(url);
    },

    create(data: Item): Promise<Item> {
        return axiosClient.post(endpoint, data);
    },

    update(data: Item): Promise<Item> {
        const url = `${endpoint}/${data.id}`;
        return axiosClient.put(url, data);
    },

    deleteById(params: Item): Promise<SuccessResponse<Item>> {
        const url = `${endpoint}/${params.id}/delete`;
        return axiosClient.delete(url);
    },
};

export default itemApi;
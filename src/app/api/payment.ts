import { ListParams, ListResponse, Payment, SuccessResponse } from "app/interfaces";
import axiosClient from "./axiosClient";

const endpoint = "/payments";

const paymentApi = {
    getAll(params?: ListParams): Promise<ListResponse<Payment>> {
        return axiosClient.get(endpoint, {params})
    },

    getById(params: Payment): Promise<Payment> {
        const url = `${endpoint}/${params.id}`;
        return axiosClient.get(url)
    },

    create(data: Payment): Promise<Payment> {
        return axiosClient.post(endpoint, data);
    },

    update(data: Payment): Promise<Payment> {
        const url = `${endpoint}/${data.id}`
        return axiosClient.put(url, data)
    },

    deleteId(params: Payment): Promise<SuccessResponse<Payment>> {
        const url = `${endpoint}/${params.id}/delete`;
        return axiosClient.delete(url);
    }
}

export default paymentApi;
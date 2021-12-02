import { ListParams, ListResponse, PaymentStatus } from "app/interfaces";
import axiosClient from "./axiosClient";

const endpoint = '/payment-statuses';

const paymentStatusApi = {
    getAll (params: ListParams): Promise<ListResponse<PaymentStatus>> {
        return axiosClient.get(endpoint, {params});
    },

    getById (data: PaymentStatus): Promise<PaymentStatus> {
        const url = `${endpoint}/${data.id}`;
        return axiosClient.get(url)
    },

    create (data: PaymentStatus): Promise<PaymentStatus> {
        return axiosClient.post(endpoint, data);
    },

    update (data: PaymentStatus): Promise<PaymentStatus> {
        const url = `${endpoint}/${data.id}`;
        return axiosClient.put(url, data);
    },

    deleteById (data: PaymentStatus): Promise<PaymentStatus> {
        const url = `${endpoint}/${data.id}/delete`;
        return axiosClient.delete(url);
    }
}

export default paymentStatusApi;
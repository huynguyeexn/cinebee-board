import { ListParams, ListResponse, SuccessResponse } from "app/interfaces";
import { ComboTicket } from "app/interfaces/comboTicket";
import axiosClient from "./axiosClient";

const endpoint = '/comboticket';

const comboTicketApi = {
    getAll(params?: ListParams): Promise<ListResponse<ComboTicket>> {
        return axiosClient.get(endpoint, { params });
    },
    getById(id: string): Promise<ComboTicket> {
        const url = `${endpoint}/${id}`;
        return axiosClient.get(url);
    },

    create(data: ComboTicket): Promise<ComboTicket> {
        return axiosClient.post(endpoint, data);
    },

    update(data: ComboTicket): Promise<ComboTicket> {
        const url = `${endpoint}/${data.id}`;
        return axiosClient.put(url, data);
    },


    deleteById(params: ComboTicket): Promise<SuccessResponse<ComboTicket>> {
        const url = `${endpoint}/${params.id}/delete`;
        return axiosClient.delete(url);
    },
}

export default comboTicketApi
import { ListParams, ListResponse } from "app/interfaces";
import { ComboTicket } from "app/interfaces/comboTicket";
import axiosClient from "./axiosClient";

const endpoint = 'comboticket';

const comboTicketApi = {
    getAll(params: ListParams): Promise<ListResponse<ComboTicket>>{
        return axiosClient.get(endpoint, {params})
    },

    getById(data: ComboTicket): Promise<ComboTicket>{
        const url = `${endpoint}/${data.id}`
        return axiosClient.get(url)
    }
}

export default comboTicketApi;
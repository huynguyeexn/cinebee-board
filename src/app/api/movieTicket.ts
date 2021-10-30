import { ListParams, ListResponse, SuccessResponse } from "app/interfaces"
import { MovieTicket } from "app/interfaces/movieTicket"
import axiosClient from "./axiosClient"

const endpoint = '/movie-tickets'

const  movieTicketApi = {
    getAll(params?: ListParams): Promise<ListResponse<MovieTicket>>{
        return axiosClient.get(endpoint, {params})
    },

    getById(params: MovieTicket): Promise<MovieTicket>{
        const url = `${endpoint}/${params.id}`
        return axiosClient.get(url)
    },

    create(data: MovieTicket): Promise<MovieTicket>{
        return axiosClient.post(endpoint, data)
    },

    update(data: MovieTicket): Promise<MovieTicket>{
        const url = `${endpoint}/${data.id}`
        return axiosClient.put(url, data)
    },

    delete(params: MovieTicket): Promise<SuccessResponse<MovieTicket>>{
        const url = `${endpoint}/${params.id}/delete`
        return axiosClient.delete(url)
    }
}

export default movieTicketApi;
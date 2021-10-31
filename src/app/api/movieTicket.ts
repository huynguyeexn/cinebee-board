import { ListParams, ListResponse } from "app/interfaces"
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
    }
}

export default movieTicketApi;
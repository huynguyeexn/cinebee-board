import { ListParams, ListResponse } from "app/interfaces"
import { Order } from "app/interfaces/order"
import axiosClient from "./axiosClient"

const endpoint = 'orders'

const orderApi = {
    getAll(params: ListParams):Promise<ListResponse<Order>>{
        return axiosClient.get(endpoint, {params})
    },

    getById(data: Order): Promise<Order>{
        const url = `${endpoint}/${data.id}`
        return axiosClient.get(url)
    }
}

export default orderApi
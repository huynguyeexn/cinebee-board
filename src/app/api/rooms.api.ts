import { IRoom } from './../interfaces/room';
import { ListParams, ListResponse } from './../interfaces/common';
import axiosClient from './axiosClient';

const roomApi = {
    getAll(params?: ListParams): Promise<ListResponse<IRoom>> {
        const url = "/rooms";
        return axiosClient.get(url, {params});
    }
}

export default roomApi;
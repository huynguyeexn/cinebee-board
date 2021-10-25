import { Room } from '../interfaces/room';
import { ListParams, ListResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/rooms';

const roomApi = {
	getAll(params?: ListParams): Promise<ListResponse<Room>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(id: string): Promise<Room> {
		const url = `${endpoint}/${id}`;
		return axiosClient.get(url);
	},
	// Add
	create(data: Room): Promise<Room> {
		return axiosClient.post(endpoint, data);
	},
};

export default roomApi;

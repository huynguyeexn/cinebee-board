import { Showtime } from 'app/interfaces/showtime';
import { ListParams, ListResponse, SuccessResponse } from '../interfaces/common';
import axiosClient from './axiosClient';

const endpoint = '/showtimes';

const showtimeApi = {
	getAll(params?: ListParams): Promise<ListResponse<Showtime>> {
		return axiosClient.get(endpoint, { params });
	},
	getById(params: Showtime): Promise<Showtime> {
		const url = `${endpoint}/${params.id}`;
		return axiosClient.get(url);
	},

	// Update
	update(data: any): Promise<Showtime> {
		return axiosClient.put(endpoint, data);
	},

	// Delete
	deleteById(params: Showtime): Promise<SuccessResponse<Showtime>> {
		const url = `${endpoint}/${params.id}/delete`;
		return axiosClient.delete(url);
	},
};

export default showtimeApi;

import { ListResponse } from './../interfaces/common';
import { Seat } from './../interfaces/seat';
import axiosClient from './axiosClient';

const seatApi = {
	getSeatOfRoom(roomId?: string | number): Promise<ListResponse<Seat>> {
		const url = `/rooms/${roomId}/seats`;
		return axiosClient.get(url);
	},
};

export default seatApi;

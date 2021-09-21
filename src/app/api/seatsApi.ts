import { ListResponse } from './../interfaces/common';
import { ISeat } from './../interfaces/seat';
import axiosClient from './axiosClient';

const seatApi = {
	getSeatOfRoom(roomId?: string | number): Promise<ListResponse<ISeat>> {
		const url = `/rooms/${roomId}/seats`;
		return axiosClient.get(url);
	},
};

export default seatApi;

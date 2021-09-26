import { AgeRating, ListResponse } from 'app/interfaces';
import axiosClient from './axiosClient';

const endpoint = '/age-ratings';

const ageRatingApi = {
	getAll(): Promise<ListResponse<AgeRating>> {
		return axiosClient.get(endpoint);
	},
};

export default ageRatingApi;

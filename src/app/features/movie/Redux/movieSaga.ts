import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import movieApi from 'app/api/movieApi';
import { ListParams, ListResponse } from 'app/interfaces';
import { Movie } from 'app/interfaces/movie';
import { movieActions } from './movieSlice';

// Gọi API lấy list Movie
function* fetchMovieList(actions: PayloadAction<ListParams>) {
	try {
		// Gọi API => Lưu vào data
		const data: ListResponse<Movie> = yield call(movieApi.getAll, actions.payload);

		// Gọi tới fetchMovieSuccess => truyền data vào
		yield put(movieActions.fetchMovieSuccess(data));
	} catch (error) {
		// In ra lỗi
		console.error('fetchMovieList: ', error);

		// Gọi tới fetchMovieError
		yield put(movieActions.fetchMovieError);
	}
}

export default function* movieSaga() {
	yield takeLatest(movieActions.fetchMovieList, fetchMovieList);
}

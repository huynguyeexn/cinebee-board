import { takeLatest, call, put, select } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import movieApi from 'app/api/movieApi';
import { ListParams, ListResponse, Movie, SuccessResponse } from 'app/interfaces';
import { movieActions } from './movieSlice';

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Movie> = yield call(movieApi.getAll, action.payload);
		yield put(movieActions.getListSuccess(data));
	} catch (error) {
		yield put(movieActions.runError());
	}
}

function* deleteById(actions: PayloadAction<Movie>) {
	try {
		const data: SuccessResponse<Movie> = yield call(movieApi.deleteById, actions.payload);
		const filter: ListParams = yield select((state) => state.movie.filter);
		yield put(movieActions.runSuccess(data));
		yield put(movieActions.getList(filter));
	} catch (error) {
		yield put(movieActions.runError());
	}
}

function* create(actions: PayloadAction<Movie>) {
	try {
		const data: SuccessResponse<Movie> = yield call(movieApi.create, actions.payload);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(movieActions.runSuccess(data));
		yield put(movieActions.getList(filter));
	} catch (error) {
		yield put(movieActions.runError());
	}
}

function* update(actions: PayloadAction<Movie>) {
	try {
		const data: SuccessResponse<Movie> = yield call(movieApi.update, actions.payload);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(movieActions.runSuccess(data));
		yield put(movieActions.getList(filter));
	} catch (error) {
		yield put(movieActions.runError());
	}
}

export default function* movieSaga() {
	yield takeLatest(movieActions.getList, getList);
	yield takeLatest(movieActions.create, create);
	yield takeLatest(movieActions.update, update);
	yield takeLatest(movieActions.deleteById, deleteById);
}

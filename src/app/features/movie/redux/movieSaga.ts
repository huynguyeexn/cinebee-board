import { takeLatest, call, put, select, debounce } from '@redux-saga/core/effects';
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

function* getListComing(action: PayloadAction<ListParams>) {
	try {
		const newParams = {
			...(action.payload as ListParams),
			filter: '2',
			filter_by: 'status',
		};
		const data: ListResponse<Movie> = yield call(movieApi.getAll, newParams);
		yield put(movieActions.getListComingSuccess(data));
	} catch (error) {
		yield put(movieActions.runError());
	}
}

function* getListPlaying(action: PayloadAction<ListParams>) {
	try {
		const newParams = {
			...(action.payload as ListParams),
			filter: '1',
			filter_by: 'status',
		};
		const data: ListResponse<Movie> = yield call(movieApi.getAll, newParams);
		yield put(movieActions.getListPlayingSuccess(data));
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

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(movieActions.setFilter(actions.payload));
}

export default function* movieSaga() {
	yield takeLatest(movieActions.getList, getList);
	yield takeLatest(movieActions.getListComing, getListComing);
	yield takeLatest(movieActions.getListPlaying, getListPlaying);
	yield takeLatest(movieActions.create, create);
	yield takeLatest(movieActions.update, update);
	yield takeLatest(movieActions.deleteById, deleteById);
	yield debounce(1000, movieActions.setFilterDebounce, setFilterDebounce);
}

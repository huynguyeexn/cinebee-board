import { takeLatest, call, put, select, debounce } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import genreApi from 'app/api/genreApi';
import { initFilterParams } from 'app/constants';
import { ListParams, ListResponse, Genre, SuccessResponse } from 'app/interfaces';
import { genreActions } from './genreSlice';
import { RootState } from 'app/redux/store';

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Genre> = yield call(genreApi.getAll, action.payload);
		yield put(genreActions.getListSuccess(data));
	} catch (error) {
		yield put(genreActions.runError());
	}
}

function* deleteById(actions: PayloadAction<Genre>) {
	try {
		const data: SuccessResponse<Genre> = yield call(genreApi.deleteById, actions.payload);
		const filter: ListParams = yield select((state) => state.genre.filter);
		yield put(genreActions.runSuccess(data));
		yield put(genreActions.getList(filter));
	} catch (error) {
		yield put(genreActions.runError());
	}
}

function* create(actions: PayloadAction<Genre>) {
	try {
		const data: SuccessResponse<Genre> = yield call(genreApi.create, actions.payload);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(genreActions.runSuccess(data));
		yield put(genreActions.getList(filter));
	} catch (error) {
		yield put(genreActions.runError());
	}
}

function* update(actions: PayloadAction<Genre>) {
	try {
		const data: SuccessResponse<Genre> = yield call(genreApi.update, actions.payload);
		const filter: ListParams = yield select((state: RootState) => state.genre.filter);
		yield put(genreActions.runSuccess(data));
		yield put(genreActions.getList(filter));
	} catch (error) {
		yield put(genreActions.runError());
	}
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(genreActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>) {
	const params: ListParams = {
		...initFilterParams,
		search: 'name',
		q: actions.payload,
		per_page: 100,
		sort_by: 'name',
		sort_type: 'asc',
	};
	try {
		const data: ListResponse<Genre> = yield call(genreApi.getAll, params);
		yield put(genreActions.searchSuccess(data));
	} catch (error) {
		yield put(genreActions.runError());
	}
}

export default function* genreSaga() {
	yield takeLatest(genreActions.getList, getList);
	yield takeLatest(genreActions.create, create);
	yield takeLatest(genreActions.update, update);
	yield takeLatest(genreActions.deleteById, deleteById);
	yield takeLatest(genreActions.setFilter, getList);
	yield debounce(1000, genreActions.setFilterDebounce, setFilterDebounce);
	yield debounce(1000, genreActions.searchByName, searchByName);
}

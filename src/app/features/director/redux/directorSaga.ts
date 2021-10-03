import { takeLatest, call, put, select, debounce } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import directorApi from 'app/api/directorApi';
import { initFilterParams } from 'app/constants';
import { ListParams, ListResponse, Director, SuccessResponse } from 'app/interfaces';
import { directorActions } from './directorSlice';

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Director> = yield call(directorApi.getAll, action.payload);
		yield put(directorActions.getListSuccess(data));
	} catch (error) {
		yield put(directorActions.runError());
	}
}

function* deleteById(actions: PayloadAction<Director>) {
	try {
		const data: SuccessResponse<Director> = yield call(
			directorApi.deleteById,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.director.filter);
		yield put(directorActions.runSuccess(data));
		yield put(directorActions.getList(filter));
	} catch (error) {
		yield put(directorActions.runError());
	}
}

function* create(actions: PayloadAction<Director>) {
	try {
		const data: SuccessResponse<Director> = yield call(
			directorApi.create,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(directorActions.runSuccess(data));
		yield put(directorActions.getList(filter));
	} catch (error) {
		yield put(directorActions.runError());
	}
}

function* update(actions: PayloadAction<Director>) {
	try {
		const data: SuccessResponse<Director> = yield call(
			directorApi.update,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(directorActions.runSuccess(data));
		yield put(directorActions.getList(filter));
	} catch (error) {
		yield put(directorActions.runError());
	}
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(directorActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>) {
	const params: ListParams = {
		...initFilterParams,
		search: 'fullname',
		q: actions.payload,
		per_page: 10,
		sort_by: 'fullname',
		sort_type: 'asc',
	};
	try {
		const data: ListResponse<Director> = yield call(directorApi.getAll, params);
		yield put(directorActions.searchSuccess(data));
	} catch (error) {
		yield put(directorActions.runError());
	}
}

export default function* directorSaga() {
	yield takeLatest(directorActions.getList, getList);
	yield takeLatest(directorActions.create, create);
	yield takeLatest(directorActions.update, update);
	yield takeLatest(directorActions.deleteById, deleteById);
	yield takeLatest(directorActions.setFilter, getList);
	yield debounce(1000, directorActions.setFilterDebounce, setFilterDebounce);
	yield debounce(1000, directorActions.searchByName, searchByName);
}

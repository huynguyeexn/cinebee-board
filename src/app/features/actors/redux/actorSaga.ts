import { takeLatest, call, put, select, debounce } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import actorApi from 'app/api/actorApi';
import { ListParams, ListResponse, Actor, SuccessResponse } from 'app/interfaces';
import { actorActions } from './actorSlice';

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Actor> = yield call(actorApi.getAll, action.payload);
		yield put(actorActions.getListSuccess(data));
	} catch (error) {
		yield put(actorActions.runError());
	}
}

function* deleteById(actions: PayloadAction<Actor>) {
	try {
		const data: SuccessResponse<Actor> = yield call(actorApi.deleteById, actions.payload);
		const filter: ListParams = yield select((state) => state.actor.filter);
		yield put(actorActions.runSuccess(data));
		yield put(actorActions.getList(filter));
	} catch (error) {
		yield put(actorActions.runError());
	}
}

function* create(actions: PayloadAction<Actor>) {
	try {
		const data: SuccessResponse<Actor> = yield call(actorApi.create, actions.payload);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(actorActions.runSuccess(data));
		yield put(actorActions.getList(filter));
	} catch (error) {
		yield put(actorActions.runError());
	}
}

function* update(actions: PayloadAction<Actor>) {
	try {
		const data: SuccessResponse<Actor> = yield call(actorApi.update, actions.payload);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(actorActions.runSuccess(data));
		yield put(actorActions.getList(filter));
	} catch (error) {
		yield put(actorActions.runError());
	}
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(actorActions.setFilter(actions.payload));
}

export default function* actorSaga() {
	yield takeLatest(actorActions.getList, getList);
	yield takeLatest(actorActions.create, create);
	yield takeLatest(actorActions.update, update);
	yield takeLatest(actorActions.deleteById, deleteById);
	yield takeLatest(actorActions.setFilter, getList);
	yield debounce(1000, actorActions.setFilterDebounce, setFilterDebounce);
}

import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import roomApi from 'app/api/roomsApi';
import { ListParams, ListResponse, Room, SuccessResponse } from 'app/interfaces';
import { roomActions } from './roomSlice';

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Room> = yield call(roomApi.getAll, action.payload);
		yield put(roomActions.getListSuccess(data));
	} catch (error) {
		yield put(roomActions.runError());
	}
}

function* create(actions: PayloadAction<Room>) {
	try {
		const data: SuccessResponse<Room> = yield call(roomApi.create, actions.payload);
		yield put(roomActions.runSuccess(data));
	} catch (error) {
		yield put(roomActions.runError());
	}
}

export default function* roomSaga() {
	yield takeLatest(roomActions.getList, getList);
	yield takeLatest(roomActions.create, create);
}

import { PayloadAction } from '@reduxjs/toolkit';
import roomApi from 'app/api/roomsApi';
import { IRoom } from 'app/interfaces/room';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ListParams, ListResponse } from 'app/interfaces/common';
import { roomActions } from './roomSlice';

function* fetchRoomList(actions: PayloadAction<ListParams>) {
	try {
		const response: ListResponse<IRoom> = yield call(roomApi.getAll, actions.payload);

		yield put(roomActions.fetchRoomSuccess(response));
	} catch (error) {
		console.error('Failed to fetch room list: ', error);
		yield put(roomActions.fetchRoomError);
	}
}

export default function* roomSaga() {
	yield takeLatest(roomActions.fetchRoomList, fetchRoomList);
}

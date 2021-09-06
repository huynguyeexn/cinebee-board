import { IRoom } from './../../../interfaces/room';
import { ListParams, ListResponse } from './../../../interfaces/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { roomActions } from './roomSlice';
import { takeLatest, put, call } from 'redux-saga/effects';
import roomApi from 'app/api/rooms.api';

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

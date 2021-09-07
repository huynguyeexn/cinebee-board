import { PayloadAction } from '@reduxjs/toolkit';
import roomApi from 'app/api/roomsApi';
import seatApi from 'app/api/seatsApi';
import { ISeat } from 'app/interfaces';
import { IRoom } from 'app/interfaces/room';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { ListParams, ListResponse } from './../../../interfaces/common';
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

import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import showtimeApi from 'app/api/showtimeApi';
import { ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import { Showtime, ShowtimeRequest } from 'app/interfaces/showtime';
import { showtimeActions } from './showtimeSlice';

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Showtime> = yield call(showtimeApi.getAll, action.payload);
		yield put(showtimeActions.getListSuccess(data));
	} catch (error) {
		yield put(showtimeActions.runError());
	}
}

function* save(actions: PayloadAction<ShowtimeRequest>) {
	try {
		const data: SuccessResponse<Showtime> = yield call(showtimeApi.update, actions.payload);
		yield put(showtimeActions.runSuccess(data));
	} catch (error) {
		yield put(showtimeActions.runError());
	}
}
export default function* showtimeSaga() {
	yield debounce(500, showtimeActions.getList, getList);
	yield takeLatest(showtimeActions.save, save);
}

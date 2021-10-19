import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import showtimeApi from "app/api/showtimeApi";
import { ListParams, ListResponse } from "app/interfaces";
import { Showtime } from "app/interfaces/showtime";
import { showtimeActions } from "./showtimeSlice";

function* getList(action: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Showtime> = yield call(showtimeApi.getAll, action.payload);
		yield put(showtimeActions.getListSuccess(data));
	} catch (error) {
		yield put(showtimeActions.runError());
	}
}

export default function* showtimeSaga () {
	yield takeLatest(showtimeActions.getList, getList);
}
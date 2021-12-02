import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import paymentStatusApi from "app/api/paymentStatus";
import { ListParams, ListResponse, PaymentStatus } from "app/interfaces";
import { paymentStatusActions } from "./paymentStatusSlice";

function* getList (actions: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<PaymentStatus> = yield call(paymentStatusApi.getAll, actions.payload);
        yield put(paymentStatusActions.getListSuccess(data));
    } catch (error) {
        yield put(paymentStatusActions.runError());
    }
}

export default function* paymentStatusSaga(){
    yield takeLatest(paymentStatusActions.getList, getList)
}
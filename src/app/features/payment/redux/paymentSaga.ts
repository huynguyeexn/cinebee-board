import { call, debounce, put, select, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import paymentApi from "app/api/payment";
import { initFilterParams } from "app/constants";
import { ListParams, ListResponse, Payment, SuccessResponse } from "app/interfaces";
import { paymentActions } from "./paymentSlice";

function* getList(actions: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<Payment> = yield call(paymentApi.getAll, actions.payload);
        yield put(paymentActions.getListSuccess(data));
    } catch (error) {
        yield put(paymentActions.runError())
    }
}

function* deleteById(actions: PayloadAction<Payment>){
    try {
        const data: SuccessResponse<Payment> = yield call(paymentApi.deleteId, actions.payload);
        const filter: ListParams = yield select((state) => state.payment.filter);
        yield put(paymentActions.runSuccess(data));
        yield put(paymentActions.getList(filter));
    } catch (error) {
        yield put(paymentActions.runError());
    }
}

function* create(actions: PayloadAction<Payment>){
    try {
        const data: SuccessResponse<Payment> = yield call(paymentApi.create, actions.payload);
        const filter: ListParams = yield select((state) => state.payment.filter);
        yield put(paymentActions.runSuccess(data));
        yield put(paymentActions.getList(filter));
    } catch (error) {
        yield put(paymentActions.runError())
    }
}

function* update(actions: PayloadAction<Payment>){
    try {
        const data: SuccessResponse<Payment> = yield call(paymentApi.update, actions.payload);
        const filter: ListParams = yield select((state) => state.payment.filter);
        yield put(paymentActions.runSuccess(data));
        yield put(paymentActions.getList(filter));
    } catch (error) {
        yield put(paymentActions.runError())
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>){
    yield put(paymentActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>){
    const params: ListParams = {
        ...initFilterParams,
        search: "name",
        q: actions.payload,
        per_page: 100,
        sort_by: "name",
        sort_type: "asc",
    };
    try {
        const data: ListResponse<Payment> = yield call(paymentApi.getAll, params);
        yield put(paymentActions.searchSuccess(data));
    } catch (error) {
        yield put(paymentActions.runError())
    }
}
export default function* paymentSaga() {
    yield takeLatest(paymentActions.getList, getList);
    yield takeLatest(paymentActions.deleteById, deleteById);
    yield takeLatest(paymentActions.create, create);
    yield takeLatest(paymentActions.update, update);
    yield takeLatest(paymentActions.setFilter, getList);
    yield debounce(1000, paymentActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, paymentActions.searchByName, searchByName);
}
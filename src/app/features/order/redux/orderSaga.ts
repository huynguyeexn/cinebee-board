import { call, debounce, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import orderApi from "app/api/order";
import { initFilterParams } from "app/constants";
import { ListParams, ListResponse } from "app/interfaces";
import { Order } from "app/interfaces/order";
import { orderActions } from "./orderSlice";

function* getList(actions: PayloadAction<ListParams>){
    try {
        const data: ListResponse<Order> = yield call(orderApi.getAll, actions.payload);
        yield put(orderActions.getListSuccess(data))
    } catch (error) {
        yield put(orderActions.runError())
    }
} 

function* setFilterDebounce(actions: PayloadAction<ListParams>){
    yield put(orderActions.setFilter(actions.payload))
}

function* searchByName(actions: PayloadAction<string>){
    const params: ListParams = {
        ...initFilterParams,
        search: 'name',
        q: actions.payload,
        per_page: 100,
        sort_by: 'name',
        sort_type: 'asc'
    };
    try {
        const data: ListResponse<Order> = yield call(orderApi.getAll, params)
        yield put(orderActions.searchSuccess(data))
    } catch (error) {
        yield put(orderActions.runError())
    }
}

export default function* orderSaga(){
    yield takeLatest(orderActions.getList, getList);
    yield takeLatest(orderActions.setFilter, getList);
    yield debounce(1000, orderActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, orderActions.searchByName, searchByName);
} 
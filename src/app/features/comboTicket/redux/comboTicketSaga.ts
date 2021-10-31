import { call, debounce, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import comboTicketApi from "app/api/comboTicket";
import { initFilterParams } from "app/constants";
import { ListParams, ListResponse } from "app/interfaces";
import { ComboTicket } from "app/interfaces/comboTicket";
import { comboTicketActions } from "./comboTicketSlice";

function* getList(actions: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<ComboTicket> = yield call(comboTicketApi.getAll, actions.payload);
        yield put(comboTicketActions.getListSuccess(data))
    } catch (error) {
        yield put(comboTicketActions.runError());
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>){
    yield put(comboTicketActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>){
    const params: ListParams = {
        ...initFilterParams,
        search: 'name',
        q: actions.payload,
        per_page: 100,
        sort_by: 'name',
        sort_type: 'asc',
    };
    try {
        const data: ListResponse<ComboTicket> = yield call(comboTicketApi.getAll, params);
        yield put(comboTicketActions.searchSuccess(data));
    } catch (error) {
        yield put(comboTicketActions.runError())
    }
}

export default function* comboTicketSaga (){
    yield takeLatest(comboTicketActions.getList, getList);
    yield takeLatest(comboTicketActions.setFilter, getList);
    yield debounce(1000, comboTicketActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, comboTicketActions.searchByName, searchByName);
}
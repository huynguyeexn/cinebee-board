import { call, debounce, put, select, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import comboTicketApi from "app/api/comboTicketApi";
import { initFilterParams } from "app/constants";
import { ListParams, ListResponse, SuccessResponse } from "app/interfaces";
import { ComboTicket } from "app/interfaces/comboTicket";
import { comboTicketActions } from "./comboTicketSlice";

function* getList(actions: PayloadAction<ListParams>) {
    try{
        const data: ListResponse<ComboTicket> = yield call(comboTicketApi.getAll, actions.payload);
        yield put(comboTicketActions.getListSuccess(data));
    } catch (error) {
        yield put(comboTicketActions.runError());
    }
}

function* deleteById(actions: PayloadAction<ComboTicket>) {
    try {
        const data: SuccessResponse<ComboTicket> = yield call(comboTicketApi.deleteById, actions.payload);
        const filter: ListParams = yield select((state) => state.comboTicket.filter);
        yield put(comboTicketActions.runSuccess(data));
        yield put(comboTicketActions.getList(filter));
    } catch (error) {
        yield put(comboTicketActions.runError());
    }
}

function* create(actions: PayloadAction<ComboTicket>) {
    try {
        const data: SuccessResponse<ComboTicket> = yield call(comboTicketApi.create, actions.payload);
        const filter: ListParams = yield select((state) => state.combo.filter);
        yield put(comboTicketActions.runSuccess(data));
        yield put(comboTicketActions.getList(filter));
    } catch (error) {
        yield put(comboTicketActions.runError());
    }
} 

function* update (actions: PayloadAction<ComboTicket>) {
    try {
        const data: SuccessResponse<ComboTicket> = yield call(comboTicketApi.update, actions.payload);
        const filter: ListParams = yield select((state) => state.combo.filter);
        yield put(comboTicketActions.runSuccess(data));
        yield put(comboTicketActions.getList(filter));
    } catch (error) {
        yield put(comboTicketActions.runError());
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
    yield put(comboTicketActions.setFilter(actions.payload));
}


function* searchByName(actions:PayloadAction<string>) {
    const params:ListParams = {
        ...initFilterParams,
        search: 'name',
        q: actions.payload,
        per_page:10,
        sort_by: 'name',
        sort_type: 'asc',
    };
    try {
        const data: ListResponse<ComboTicket> = yield call(comboTicketApi.getAll, params);
        yield put(comboTicketActions.searchSuccess(data));
    } catch (error) {
        yield put(comboTicketActions.runError());
    }
}

export default function* comboTicketSaga() {
    yield takeLatest(comboTicketActions.getList, getList);
    yield takeLatest(comboTicketActions.create, create);
    yield takeLatest(comboTicketActions.update, update);
    yield takeLatest(comboTicketActions.deleteById, deleteById);
    yield takeLatest(comboTicketActions.setFilter, getList);
    yield debounce(1000, comboTicketActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, comboTicketActions.searchByName, searchByName);
}

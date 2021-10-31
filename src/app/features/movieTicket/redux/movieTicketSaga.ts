import { call, debounce, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import movieTicketApi from "app/api/movieTicket";
import { initFilterParams } from "app/constants";
import { ListParams, ListResponse } from "app/interfaces";
import { MovieTicket } from "app/interfaces/movieTicket";
import { movieTicketActions } from "./movieTicketSlice";

function* getList(actions: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<MovieTicket> = yield call(movieTicketApi.getAll, actions.payload);
        yield put(movieTicketActions.getListSuccess(data));
    } catch (error) {
        yield put(movieTicketActions.runError())
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>){
    yield put(movieTicketActions.setFilter(actions.payload));
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
        const data: ListResponse<MovieTicket> = yield call(movieTicketApi.getAll, params);
        yield put(movieTicketActions.searchSuccess(data));
    } catch (error) {
        yield put(movieTicketActions.runError())
    }
}
export default function* movieTicketSaga() {
    yield takeLatest(movieTicketActions.getList, getList);
    yield takeLatest(movieTicketActions.setFilter, getList);
    yield debounce(1000, movieTicketActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, movieTicketActions.searchByName, searchByName);
}
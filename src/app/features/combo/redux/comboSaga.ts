import { Combo, ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, select, takeLatest } from '@redux-saga/core/effects';
import comboApi from 'app/api/comboApi';
import { comboActions } from './comboSlice';
import { initFilterParams } from 'app/constants';

function* getList(action: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<Combo> = yield call(comboApi.getAll, action.payload);
        yield put(comboActions.getListSuccess(data));
    } catch (error) {
        yield put(comboActions.runError());
    }
}

function* deleteById(actions: PayloadAction<Combo>) {
    try {
        const data: SuccessResponse<Combo> = yield call(comboApi.deleteById, actions.payload);
        const filter: ListParams = yield select((state) => state.actor.filter);
        yield put(comboActions.runSuccess(data));
        yield put(comboActions.getList(filter));
    } catch (error) {
        yield put(comboActions.runError());
    }
}

function* create(actions: PayloadAction<Combo>) {
    try {
        const data: SuccessResponse<Combo> = yield call(comboApi.create, actions.payload);
        const filter: ListParams = yield select((state) => state.actor.filter);
        yield put(comboActions.runSuccess(data));
        yield put(comboActions.getList(filter));
    } catch (error) {
        yield put(comboActions.runError());
    }
} 

function* update (actions: PayloadAction<Combo>) {
    try {
        const data: SuccessResponse<Combo> = yield call(comboApi.update, actions.payload);
        const filter: ListParams = yield select((state) => state.actor.filter);
        yield put(comboActions.runSuccess(data));
        yield put(comboActions.getList(filter));
    } catch (error) {
        yield put(comboActions.runError());
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
    yield put(comboActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>) {
    const params: ListParams = {
        ...initFilterParams,
        search: 'name', 
        q: actions.payload,
        per_page: 10,
        sort_by: 'fullname',
        sort_type: 'asc',
    };
    try {
        const data: ListResponse<Combo> = yield call(comboApi.getAll, params);
        yield put(comboActions.searchSuccess(data));
    } catch (error) {
        yield put(comboActions.runError());
    }
}

export default function* comboSaga() {
    yield takeLatest(comboActions.getList, getList);
    yield takeLatest(comboActions.create, create);
    yield takeLatest(comboActions.update, update);
    yield takeLatest(comboActions.deleteById, deleteById);
    yield takeLatest(comboActions.setFilter, getList);
    yield debounce(1000, comboActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, comboActions.searchByName, searchByName);
}
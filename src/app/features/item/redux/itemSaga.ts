import { ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import { Item } from 'app/interfaces/item';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, select, takeLatest } from '@redux-saga/core/effects';
import itemApi from 'app/api/itemApi';
import { itemActions } from './itemSilce';
import { initFilterParams } from 'app/constants';

function* getList(action: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<Item> = yield call(itemApi.getAll, action.payload);
        yield put(itemActions.getListSuccess(data));
    } catch (error) {
        yield put(itemActions.runError());
    }
}

function* deleteById(actions: PayloadAction<Item>) {
    try {
        const data: SuccessResponse<Item> = yield call(itemApi.deleteById, actions.payload);
        const filter: ListParams = yield select((state) => state.actor.filter);
        yield put(itemActions.runSuccess(data));
        yield put(itemActions.getList(filter));
    } catch (error) {
        yield put(itemActions.runError());
    }
}

function* create(actions: PayloadAction<Item>) {
    try {
        const data: SuccessResponse<Item> = yield call(itemApi.create, actions.payload);
        const filter: ListParams = yield select((state) => state.actor.filter);
        yield put(itemActions.runSuccess(data));
        yield put(itemActions.getList(filter));
    } catch (error) {
        yield put(itemActions.runError());
    }
} 

function* update (actions: PayloadAction<Item>) {
    try {
        const data: SuccessResponse<Item> = yield call(itemApi.update, actions.payload);
        const filter: ListParams = yield select((state) => state.actor.filter);
        yield put(itemActions.runSuccess(data));
        yield put(itemActions.getList(filter));
    } catch (error) {
        yield put(itemActions.runError());
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
    yield put(itemActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>) {
    const params: ListParams = {
        ...initFilterParams,
        search: 'name', 
        q: actions.payload,
        per_page: 10,
        sort_by: 'name',
        sort_type: 'asc',
    };
    try {
        const data: ListResponse<Item> = yield call(itemApi.getAll, params);
        yield put(itemActions.searchSuccess(data));
    } catch (error) {
        yield put(itemActions.runError());
    }
}

export default function* itemSaga() {
    yield takeLatest(itemActions.getList, getList);
    yield takeLatest(itemActions.create, create);
    yield takeLatest(itemActions.update, update);
    yield takeLatest(itemActions.deleteById, deleteById);
    yield takeLatest(itemActions.setFilter, getList);
    yield debounce(1000, itemActions.setFilterDebounce, setFilterDebounce);
    yield debounce(1000, itemActions.searchByName, searchByName);
}
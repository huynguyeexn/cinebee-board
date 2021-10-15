import { call, debounce, put, select, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import categoryApi from "app/api/category";
import { initFilterParams } from "app/constants";
import { ListParams, ListResponse, SuccessResponse } from "app/interfaces";
import { Category } from "app/interfaces/category";
import { categoryActions } from "./categorySlice";

function* getList(actions: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<Category> = yield call(categoryApi.getAll, actions.payload);
        yield put(categoryActions.getListSuccess(data))
    } catch (error) {
        yield put(categoryActions.runError())
    }
}

function* create (actions: PayloadAction<Category>) {
    try {
        const data: SuccessResponse<Category> = yield call(categoryApi.create, actions.payload);
        const filter: ListParams = yield select((state) => state.category.filter);
        yield put(categoryActions.runSuccess(data));
        yield put(categoryActions.getList(filter));
    } catch (error) {
        yield put(categoryActions.runError())
    }
}

function* update (actions: PayloadAction<Category>) {
    try {
        const data: SuccessResponse<Category> = yield call(categoryApi.update, actions.payload);
        const filter: ListParams = yield select((state) => state.category.filter);
        yield put(categoryActions.runSuccess(data));
        yield put(categoryActions.getList(filter));
    } catch (error) {
        yield put(categoryActions.runError())
    }
}

function* deleteById(actions: PayloadAction<Category>) {
    try {
        const data: SuccessResponse<Category> = yield call(categoryApi.deleteById, actions.payload);
        const filter: ListParams = yield select((state) => state.category.filter);
        yield put(categoryActions.runSuccess(data));
        yield put(categoryActions.getList(filter));
    } catch (error) {
        yield put(categoryActions.runError);
    }
}

function* setFilterDebounce (actions: PayloadAction<ListParams>) {
    yield put(categoryActions.setFilter(actions.payload));
}

function* searchByName(actions: PayloadAction<string>) {
	const params: ListParams = {
		...initFilterParams,
		search: 'name',
		q: actions.payload,
		per_page: 100,
		sort_by: 'name',
		sort_type: 'asc',
	};
	try {
		const data: ListResponse<Category> = yield call(categoryApi.getAll, params);
		yield put(categoryActions.searchSuccess(data));
	} catch (error) {
		yield put(categoryActions.runError());
	}
}

export default function* categorySaga() {
    yield takeLatest(categoryActions.getList, getList);
    yield takeLatest(categoryActions.setFilter, getList);
    yield takeLatest(categoryActions.create, create);
    yield takeLatest(categoryActions.update, update);
    yield takeLatest(categoryActions.deleteById, deleteById);
    yield debounce(1000, categoryActions.setFilterDebounce, setFilterDebounce);
	yield debounce(1000, categoryActions.searchByName, searchByName);
}
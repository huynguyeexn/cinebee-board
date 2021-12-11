import { call, debounce, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import customerTypeApi from 'app/api/customerType';
import { initFilterParams } from 'app/constants';
import { CustomerType, ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import { customerTypeActions } from './customerTypeSlice';

function* getAll() {
	try {
		const response: ListResponse<CustomerType> = yield call(customerTypeApi.getAll);
		yield put(customerTypeActions.getAllSuccess(response));
	} catch (error) {
		yield put(customerTypeActions.runError);
	}
}

function* getList(actions: PayloadAction<ListParams>) {
    try {
        const data: ListResponse<CustomerType> = yield call(customerTypeApi.getList, actions.payload);
        yield put(customerTypeActions.getAllSuccess(data));
    } catch (error) {
        yield put(customerTypeActions.runError())
    }
}

function* deleteById(actions: PayloadAction<CustomerType>){
	try {
		const data: SuccessResponse<CustomerType> = yield call(customerTypeApi.deleteById, actions.payload);
		const filter: ListParams = yield select((state) => state.customerType.filter);
		yield put(customerTypeActions.runSuccess(data));
		yield put(customerTypeActions.getList(filter));
	} catch (error) {
		yield put(customerTypeActions.runError());
	}
}

function* create(action: PayloadAction<CustomerType>){
	try {
		const data: SuccessResponse<CustomerType> = yield call(customerTypeApi.create, action.payload);
		const filter: ListParams = yield select((state) => state.customerType.filter);
		yield put(customerTypeActions.runSuccess(data));
		yield put(customerTypeActions.getList(filter));
	} catch (error) {
		yield put(customerTypeActions.runError())
	}
}

function* update(action: PayloadAction<CustomerType>){
	try {
		const data: SuccessResponse<CustomerType> = yield call(customerTypeApi.update, action.payload);
		const filter: ListParams = yield select((state) => state.customerType.filter);
		yield put(customerTypeActions.runSuccess(data));
		yield put(customerTypeActions.getList(filter));
	} catch (error) {
		yield put(customerTypeActions.runError())
	}
}

function* setFilterDebounce(action: PayloadAction<ListParams>){
	yield put(customerTypeActions.setFilter(action.payload));
}

function* searchByName(action: PayloadAction<string>){
	const params: ListParams = {
		...initFilterParams,
		search: 'name',
		q: action.payload,
		per_page: 100,
		sort_by: 'name',
		sort_type: 'asc',
	};
	try {
		const data: ListResponse<CustomerType> = yield call(customerTypeApi.getList, params);
		yield put(customerTypeActions.searchByNameSuccess(data));
	} catch (error) {
		yield put(customerTypeActions.runError())
	}
}

export default function* customerTypeSaga() {
	yield takeLatest(customerTypeActions.getAll, getAll);
	yield takeLatest(customerTypeActions.setFilter, getList);
	yield takeLatest(customerTypeActions.getList, getList);
	yield takeLatest(customerTypeActions.create, create);
	yield takeLatest(customerTypeActions.update, update);
	yield takeLatest(customerTypeActions.deleteById, deleteById);
	yield debounce(1000,customerTypeActions.setFilterDebounce, setFilterDebounce);
	yield debounce(1000,customerTypeActions.searchByName, searchByName);
}

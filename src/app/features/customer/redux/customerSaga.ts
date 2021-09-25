import { call, debounce, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import customerApi from 'app/api/customer';
import { ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import { Customer } from 'app/interfaces/customer';
import { customerActions } from './customerSlice';

function* getList(actions: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Customer> = yield call(customerApi.getAll, actions.payload);
		yield put(customerActions.getListSuccess(data));
	} catch (error) {
		yield put(customerActions.runError());
	}
}

function* deleteById(actions: PayloadAction<Customer>) {
	try {
		const data: SuccessResponse<Customer> = yield call(
			customerApi.deleteById,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(customerActions.runSuccess(data));
		yield put(customerActions.getList(filter));
	} catch (error) {
		yield put(customerActions.runError());
	}
}

function* create(actions: PayloadAction<Customer>) {
	try {
		const data: SuccessResponse<Customer> = yield call(
			customerApi.create,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(customerActions.runSuccess(data));
		yield put(customerActions.getList(filter));
	} catch (error) {
		yield put(customerActions.runError());
	}
}

function* update(actions: PayloadAction<Customer>) {
	try {
		const data: SuccessResponse<Customer> = yield call(
			customerApi.update,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.customer.filter);
		yield put(customerActions.runSuccess(data));
		yield put(customerActions.getList(filter));
	} catch (error) {
		yield put(customerActions.runError());
	}
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(customerActions.setFilter(actions.payload));
}

export default function* customerSaga() {
	yield takeLatest(customerActions.getList, getList);
	yield takeLatest(customerActions.setFilter, getList);
	yield takeLatest(customerActions.create, create);
	yield takeLatest(customerActions.update, update);
	yield takeLatest(customerActions.deleteById, deleteById);
	yield debounce(1000, customerActions.setFilterDebounce, setFilterDebounce);
}

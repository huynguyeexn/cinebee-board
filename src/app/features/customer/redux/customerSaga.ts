import { call, debounce, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import customerApi from 'app/api/customer';
import { ListParams, ListResponse, SuccessResponse } from 'app/interfaces';
import { Customer } from 'app/interfaces/customer';
import { customerActions } from './customerSlice';

function* fetchCustomerList(actions: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Customer> = yield call(customerApi.getAll, actions.payload);
		yield put(customerActions.fetchCustomerListSuccess(data));
	} catch (error) {
		console.error('fetchCustomerList: ', error);
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
		yield put(customerActions.fetchCustomerList(filter));
	} catch (e) {
		yield put(customerActions.runError());
	}
}

export default function* customerSaga() {
	yield takeLatest(customerActions.fetchCustomerList, fetchCustomerList);
	yield takeLatest(customerActions.setFilter, fetchCustomerList);
	yield takeLatest(customerActions.deleteById, deleteById);
	yield debounce(1000, customerActions.setFilterDebounce, fetchCustomerList);
}

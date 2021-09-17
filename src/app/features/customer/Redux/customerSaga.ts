import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import customerApi from 'app/api/customer';
import { ListParams, ListResponse } from 'app/interfaces';
import { Customer } from 'app/interfaces/customer';
import { customerActions } from './customerSlice';

function* fetchCustomerList(actions: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Customer> = yield call(customerApi.getAll, actions.payload);
		console.log(data);
		yield put(customerActions.fetchCustomerListSuccess(data));
	} catch (error) {
		console.error('fetchCustomerList: ', error);
	}
}

export default function* customerSaga() {
	yield takeLatest(customerActions.fetchCustomerList, fetchCustomerList);
	yield takeLatest(customerActions.setFilter, fetchCustomerList);
	yield debounce(1000, customerActions.setFilterDebounce, fetchCustomerList);
}

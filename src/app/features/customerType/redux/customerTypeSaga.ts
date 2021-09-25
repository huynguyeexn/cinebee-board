import { call, put, takeLatest } from '@redux-saga/core/effects';
import customerTypeApi from 'app/api/customerType';
import { CustomerType, ListResponse } from 'app/interfaces';
import { customerTypeActions } from './customerTypeSlice';

function* getAll() {
	try {
		const response: ListResponse<CustomerType> = yield call(customerTypeApi.getAll);
		yield put(customerTypeActions.getAllSuccess(response));
	} catch (error) {
		yield put(customerTypeActions.runError);
	}
}

export default function* customerTypeSaga() {
	yield takeLatest(customerTypeActions.getAll, getAll);
}

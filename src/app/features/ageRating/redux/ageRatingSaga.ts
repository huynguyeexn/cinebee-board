import { call, put, takeLatest } from '@redux-saga/core/effects';
import ageRatingApi from 'app/api/ageRatingApi';
import { AgeRating, ListResponse } from 'app/interfaces';
import { ageRatingActions } from './ageRatingSlice';

function* getList() {
	try {
		const data: ListResponse<AgeRating> = yield call(ageRatingApi.getAll);
		yield put(ageRatingActions.getListSuccess(data));
	} catch (error) {
		yield put(ageRatingActions.runError());
	}
}

export default function* ageRatingSaga() {
	yield takeLatest(ageRatingActions.getList, getList);
}

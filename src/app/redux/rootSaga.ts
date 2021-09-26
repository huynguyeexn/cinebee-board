import ageRatingSaga from 'app/features/ageRating/redux/ageRatingSaga';
import customerSaga from 'app/features/customer/redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
import movieSaga from 'app/features/movie/redux/movieSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([movieSaga(), customerSaga(), customerTypeSaga(), ageRatingSaga()]);
}

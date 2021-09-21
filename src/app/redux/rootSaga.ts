import customerSaga from 'app/features/customer/redux1/customerSaga';
// import movieSaga from 'app/features/movie/Redux/movieSaga';
// import roomSaga from 'app/features/room/Redux/roomSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([
		// roomSaga(),
		// movieSaga(),
		customerSaga(),
	]);
}

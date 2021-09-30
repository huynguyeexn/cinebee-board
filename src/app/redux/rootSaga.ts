import ageRatingSaga from 'app/features/ageRating/redux/ageRatingSaga';
import customerSaga from 'app/features/customer/redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
import employeeSaga from 'app/features/employee/redux/employeeSaga';
import employeeRoleSaga from 'app/features/employeeRole/redux/employeeRoleSaga';
// import movieSaga from 'app/features/movie/Redux/movieSaga';
// import roomSaga from 'app/features/room/Redux/roomSaga';
import movieSaga from 'app/features/movie/redux/movieSaga';
import uploadSaga from 'app/features/upload/redux/uploadSage';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([
		movieSaga(),
		customerSaga(),
		customerTypeSaga(),
		employeeSaga(),
		employeeRoleSaga(),
		ageRatingSaga(),
		uploadSaga(),
	]);
}

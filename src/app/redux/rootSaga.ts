import customerSaga from 'app/features/customer/Redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
import employeeSaga from 'app/features/employee/Redux/employeeSaga';
import employeeRoleSaga from 'app/features/employeeRole/Redux/employeeRoleSaga';
// import movieSaga from 'app/features/movie/Redux/movieSaga';
// import roomSaga from 'app/features/room/Redux/roomSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([
		// roomSaga(),
		// movieSaga(),
		customerSaga(),
		customerTypeSaga(),
		employeeSaga(),
		employeeRoleSaga(),
	]);
}

import actorSaga from 'app/features/actors/redux/actorSaga';
import ageRatingSaga from 'app/features/ageRating/redux/ageRatingSaga';
import customerSaga from 'app/features/customer/redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
import employeeSaga from 'app/features/employee/redux/employeeSaga';
import employeeRoleSaga from 'app/features/employeeRole/redux/employeeRoleSaga';
// import movieSaga from 'app/features/movie/Redux/movieSaga';
// import roomSaga from 'app/features/room/Redux/roomSaga';
import directorSaga from 'app/features/director/redux/directorSaga';
import genreSaga from 'app/features/genres/redux/genreSaga';
import movieSaga from 'app/features/movie/redux/movieSaga';
import uploadSaga from 'app/features/upload/redux/uploadSage';
import { all } from 'redux-saga/effects';
import categorySaga from 'app/features/category/redux/categorySaga';
import paymentSaga from 'app/features/payment/redux/paymentSaga';
import paymentStatusSaga from 'app/features/paymentStatus/redux/paymentStatusSaga';
import movieTicketSaga from 'app/features/movieTicket/redux/movieTicketSaga';
import comboTicketSaga from 'app/features/comboTicket/redux/comboTicketSaga';
import orderSaga from 'app/features/order/redux/orderSaga';

export default function* rootSaga() {
	yield all([
		movieSaga(),
		customerSaga(),
		customerTypeSaga(),
		employeeSaga(),
		employeeRoleSaga(),
		ageRatingSaga(),
		uploadSaga(),
		actorSaga(),
		genreSaga(),
		directorSaga(),
		categorySaga(),
		paymentSaga(),
		paymentStatusSaga(),
		movieTicketSaga(),
		comboTicketSaga(),
		orderSaga(),
	]);
}

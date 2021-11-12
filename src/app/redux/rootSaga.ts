import actorSaga from 'app/features/actors/redux/actorSaga';
import ageRatingSaga from 'app/features/ageRating/redux/ageRatingSaga';
import categorySaga from 'app/features/category/redux/categorySaga';
import comboSaga from 'app/features/combo/redux/comboSaga';
import customerSaga from 'app/features/customer/redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
import directorSaga from 'app/features/director/redux/directorSaga';
import employeeSaga from 'app/features/employee/redux/employeeSaga';
import employeeRoleSaga from 'app/features/employeeRole/redux/employeeRoleSaga';
import genreSaga from 'app/features/genres/redux/genreSaga';
import itemSaga from 'app/features/item/redux/itemSaga';
import movieSaga from 'app/features/movie/redux/movieSaga';
import roomSaga from 'app/features/room/redux/roomSaga';
import uploadSaga from 'app/features/upload/redux/uploadSage';
import { all } from 'redux-saga/effects';
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
		comboSaga(),
		itemSaga(),
		comboTicketSaga(),
		directorSaga(),
		roomSaga(),
		categorySaga(),
		paymentSaga(),
		paymentStatusSaga(),
		movieTicketSaga(),
		comboTicketSaga(),
		orderSaga(),
	]);
}

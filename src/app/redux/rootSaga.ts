import actorSaga from 'app/features/actors/redux/actorSaga';
import ageRatingSaga from 'app/features/ageRating/redux/ageRatingSaga';
import categorySaga from 'app/features/category/redux/categorySaga';
import comboSaga from 'app/features/combo/redux/comboSaga';
import comboTicketSaga from 'app/features/comboTicket/redux/comboTicketSaga';
import customerSaga from 'app/features/customer/redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
// import employeeSaga from 'app/features/employee/redux/employeeSaga';
import employeeSaga from 'app/features/Employee/redux/employeeSaga';
import directorSaga from 'app/features/director/redux/directorSaga';
import employeeRoleSaga from 'app/features/employeeRole/redux/employeeRoleSaga';
import genreSaga from 'app/features/genres/redux/genreSaga';
import itemSaga from 'app/features/item/redux/itemSaga';
import movieSaga from 'app/features/movie/redux/movieSaga';
import roomSaga from 'app/features/room/redux/roomSaga';
import showtimeSaga from 'app/features/showtime/redux/showtimeSaga';
import uploadSaga from 'app/features/upload/redux/uploadSage';
import RoleSaga from 'app/features/Role/redux/RodeSaga';
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
		actorSaga(),
		genreSaga(),
		comboSaga(),
		itemSaga(),
		comboTicketSaga(),
		directorSaga(),
		RoleSaga(),
		roomSaga(),
		categorySaga(),
		showtimeSaga(),
	]);
}

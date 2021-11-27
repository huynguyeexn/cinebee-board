import actorReducer from 'app/features/actors/redux/actorSlice';
import ageRatingReducer from 'app/features/ageRating/redux/ageRatingSlice';
import customerReducer from 'app/features/customer/redux/customerSlice';
import customerTypeReducer from 'app/features/customerType/redux/customerTypeSlice';
import employeeReducer from 'app/features/employee/redux/employeeSlice';
import employeeRoleReducer from 'app/features/employeeRole/redux/employeeRoleSlice';
// import movieReducer from 'app/features/movie/Redux/movieSlice';
// import roomReducer from 'app/features/room/Redux/roomSlice';
import directorReducer from 'app/features/director/redux/directorSlice';
import genreReducer from 'app/features/genres/redux/genreSlice';
import movieReducer from 'app/features/movie/redux/movieSlice';
import roomReducer from 'app/features/room/redux/roomSlice';
import uploadReducer from 'app/features/upload/redux/uploadSlice';
import comboReducer from 'app/features/combo/redux/comboSlice';
import itemReducer from 'app/features/item/redux/itemSilce';
import comboTicketReducer from 'app/features/comboTicket/redux/comboTicketSlice';
import { combineReducers } from 'redux';
import categoryReducer from 'app/features/category/redux/categorySlice';
import paymentReducer from 'app/features/payment/redux/paymentSlice';
import paymentStatusReducer from 'app/features/paymentStatus/redux/paymentStatusSlice';
import movieTicketReducer from 'app/features/movieTicket/redux/movieTicketSlice';
import orderReducer from 'app/features/order/redux/orderSlice';
import showtimeReducer from 'app/features/showtime/redux/showtimeSlice';
import BlogReducer from 'app/features/Blog/redux/BlogSlide';


const rootReducer = combineReducers({
	ageRating: ageRatingReducer,
	movie: movieReducer,
	customer: customerReducer,
	customerType: customerTypeReducer,
	employee: employeeReducer,
	employeeRole: employeeRoleReducer,
	upload: uploadReducer,
	actor: actorReducer,
	genre: genreReducer,
	combo: comboReducer,
	item: itemReducer,
	comboTicket: comboTicketReducer,
	director: directorReducer,
	showtime: showtimeReducer,
	room: roomReducer,
	category: categoryReducer,
	payment: paymentReducer,
	paymentStatus: paymentStatusReducer,
	movieTicket: movieTicketReducer,
	order: orderReducer,
	blog: BlogReducer
});

export default rootReducer;

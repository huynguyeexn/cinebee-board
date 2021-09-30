import ageRatingReducer from 'app/features/ageRating/redux/ageRatingSlice';
import customerReducer from 'app/features/customer/redux/customerSlice';
import customerTypeReducer from 'app/features/customerType/redux/customerTypeSlice';
import employeeReducer from 'app/features/employee/redux/employeeSlice';
import employeeRoleReducer from 'app/features/employeeRole/redux/employeeRoleSlice';
// import movieReducer from 'app/features/movie/Redux/movieSlice';
// import roomReducer from 'app/features/room/Redux/roomSlice';
import movieReducer from 'app/features/movie/redux/movieSlice';
import uploadReducer from 'app/features/upload/redux/uploadSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	ageRating: ageRatingReducer,
	movie: movieReducer,
	customer: customerReducer,
	customerType: customerTypeReducer,
	employee: employeeReducer,
	employeeRole: employeeRoleReducer,
	upload: uploadReducer,
});

export default rootReducer;

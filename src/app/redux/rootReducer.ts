
import customerReducer from '../features/customer/Redux/customerSlice';
import customerTypeReducer from 'app/features/customerType/redux/customerTypeSlice';
// import movieReducer from 'app/features/movie/Redux/movieSlice';
// import roomReducer from 'app/features/room/Redux/roomSlice';
import { combineReducers } from 'redux';
import employeeRoleReducer from 'app/features/employeeRole/Redux/employeeRoleSlice';
import employeeReducer from 'app/features/employee/Redux/employeeSlice';

const rootReducer = combineReducers({
	// room: roomReducer,
	// movie: movieReducer,
	customer: customerReducer,
	customerType: customerTypeReducer,
	employee: employeeReducer,
	employeeRole: employeeRoleReducer,
});

export default rootReducer;

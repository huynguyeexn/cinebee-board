import employeeReducer from 'app/features/employee/Redux/employeeSlice';
import movieReducer from 'app/features/movie/Redux/movieSlice';
import roomReducer from 'app/features/room/Redux/roomSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	room: roomReducer,
	movie: movieReducer,
	employee: employeeReducer,
});

export default rootReducer;

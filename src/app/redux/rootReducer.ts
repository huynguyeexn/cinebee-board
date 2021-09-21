import customerReducer from 'app/features/customer/redux1/customerSlice';
// import movieReducer from 'app/features/movie/Redux/movieSlice';
// import roomReducer from 'app/features/room/Redux/roomSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	// room: roomReducer,
	// movie: movieReducer,
	customer: customerReducer,
});

export default rootReducer;

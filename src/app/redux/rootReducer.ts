import customerReducer from 'app/features/customer/redux/customerSlice';
import customerTypeReducer from 'app/features/customerType/redux/customerTypeSlice';
// import movieReducer from 'app/features/movie/Redux/movieSlice';
// import roomReducer from 'app/features/room/Redux/roomSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	// room: roomReducer,
	// movie: movieReducer,
	customer: customerReducer,
	customerType: customerTypeReducer,
});

export default rootReducer;

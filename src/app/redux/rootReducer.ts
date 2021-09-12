import movieReducer from 'app/features/movie/Redux/movieSlice';
import roomReducer from 'app/features/room/Redux/roomSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	room: roomReducer,
	movie: movieReducer,
});

export default rootReducer;

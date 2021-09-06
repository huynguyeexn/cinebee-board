import roomReducer from 'app/features/room/Redux/roomSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	room: roomReducer,
});

export default rootReducer;

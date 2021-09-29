import ageRatingReducer from 'app/features/ageRating/redux/ageRatingSlice';
import customerReducer from 'app/features/customer/redux/customerSlice';
import customerTypeReducer from 'app/features/customerType/redux/customerTypeSlice';
import movieReducer from 'app/features/movie/redux/movieSlice';
import uploadReducer from 'app/features/upload/redux/uploadSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	ageRating: ageRatingReducer,
	movie: movieReducer,
	customer: customerReducer,
	customerType: customerTypeReducer,
	upload: uploadReducer,
});

export default rootReducer;

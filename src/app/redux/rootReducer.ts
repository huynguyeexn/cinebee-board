import actorReducer from 'app/features/actors/redux/actorSlice';
import ageRatingReducer from 'app/features/ageRating/redux/ageRatingSlice';
import customerReducer from 'app/features/customer/redux/customerSlice';
import customerTypeReducer from 'app/features/customerType/redux/customerTypeSlice';
import directorReducer from 'app/features/director/redux/directorSlice';
import genreReducer from 'app/features/genres/redux/genreSlice';
import movieReducer from 'app/features/movie/redux/movieSlice';
import uploadReducer from 'app/features/upload/redux/uploadSlice';
import RoleReducer from 'app/features/Role/redux/RoleSlide';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	ageRating: ageRatingReducer,
	movie: movieReducer,
	customer: customerReducer,
	customerType: customerTypeReducer,
	upload: uploadReducer,
	actor: actorReducer,
	genre: genreReducer,
	director: directorReducer,
	role: RoleReducer,
});

export default rootReducer;

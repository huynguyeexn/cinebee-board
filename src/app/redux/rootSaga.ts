import actorSaga from 'app/features/actors/redux/actorSaga';
import ageRatingSaga from 'app/features/ageRating/redux/ageRatingSaga';
import comboSaga from 'app/features/combo/redux/comboSaga';
import customerSaga from 'app/features/customer/redux/customerSaga';
import customerTypeSaga from 'app/features/customerType/redux/customerTypeSaga';
import genreSaga from 'app/features/genres/redux/genreSaga';
import itemSaga from 'app/features/item/redux/itemSaga';
import movieSaga from 'app/features/movie/redux/movieSaga';
import uploadSaga from 'app/features/upload/redux/uploadSage';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([
		movieSaga(),
		customerSaga(),
		customerTypeSaga(),
		ageRatingSaga(),
		uploadSaga(),
		actorSaga(),
		genreSaga(),
		comboSaga(),
		itemSaga(),
	]);
}

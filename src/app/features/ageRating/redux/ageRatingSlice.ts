import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastSuccess } from 'app/utils/Toast';
import { AgeRating, ListResponse, SuccessResponse } from 'app/interfaces';
import { RootState } from 'app/redux/store';

export interface AgeRatingState {
	list: AgeRating[];
	loading: boolean;
}

const initialState: AgeRatingState = {
	list: [],
	loading: false,
};

const ageRatingSlice = createSlice({
	name: 'ageRating',
	initialState: initialState,
	reducers: {
		getList: (state) => {
			state.loading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<AgeRating>>) => {
			state.loading = false;
			state.list = action.payload.data;
		},

		runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			ToastSuccess(action.payload.message);
			state.loading = false;
		},
		runError: (state) => {
			state.loading = false;
		},
	},
});

// Actions
export const ageRatingActions = ageRatingSlice.actions;

// Selectors
export const selectAgeRatingList = (state: RootState) => state.ageRating.list;
export const selectAgeRatingLoading = (state: RootState) => state.ageRating.loading;

export const selectAgeRatingMap = createSelector(
	selectAgeRatingList,
	(list: AgeRating[]) => {
		return list.reduce((map: { [key: string]: AgeRating }, rating: AgeRating) => {
			map[`${rating.id}`] = rating;
			return map;
		}, {});
	}
);

export const selectAgeRatingOptions = createSelector(
	selectAgeRatingList,
	(list: AgeRating[]) =>
		list.map((rating) => ({
			value: rating.id as string | number,
			label: `(${rating.name}) - ${rating.description}`,
		}))
);

// Reducer
const ageRatingReducer = ageRatingSlice.reducer;
export default ageRatingReducer;

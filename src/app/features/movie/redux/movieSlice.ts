import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	ListParams,
	ListResponse,
	Movie,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface MovieState {
	list: Movie[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: MovieState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const movieSlice = createSlice({
	name: 'movie',
	initialState: initialState,
	reducers: {
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Movie>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		deleteById: (state, action: PayloadAction<Movie>) => {
			state.actionLoading = true;
		},

		// Handle
		runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			ToastSuccess(action.payload.message);
			state.listLoading = false;
			state.actionLoading = false;
		},
		runError: (state) => {
			state.listLoading = false;
			state.actionLoading = false;
		},
	},
});

// Actions
export const movieActions = movieSlice.actions;

// Selectors
export const selectMovieList = (state: RootState) => state.movie.list;
export const selectMoviePagination = (state: RootState) => state.movie.pagination;
export const selectMovieFilter = (state: RootState) => state.movie.filter;

export const selectMovieListLoading = (state: RootState) => state.movie.listLoading;
export const selectMovieActionLoading = (state: RootState) => state.movie.actionLoading;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import { ListParams, ListResponse, PaginationParams } from 'app/interfaces';
import { Movie } from 'app/interfaces/movie';
import { RootState } from 'app/redux/store';

export interface MovieState {
	// List movie
	list?: Movie[];

	// Filter
	filter?: ListParams;

	// Pagination
	pagination?: PaginationParams;

	// Loading
	loading: boolean;
}

const initialState: MovieState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	loading: false,
};

const movieSlice = createSlice({
	name: 'movie',
	initialState: initialState,
	reducers: {
		fetchMovieList: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
		},
		fetchMovieSuccess: (state, action: PayloadAction<ListResponse<Movie>>) => {
			state.loading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		fetchMovieError: (state, action: PayloadAction<ListParams>) => {
			state.loading = false;
		},
	},
});

// Actions
export const movieActions = movieSlice.actions;

// Selectors
export const selectMovieList = (state: RootState) => state.movie.list;
export const selectMovieLoading = (state: RootState) => state.movie.loading;
export const selectMovieFilter = (state: RootState) => state.movie.filter;
export const selectMoviePagination = (state: RootState) => state.movie.pagination;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;

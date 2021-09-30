import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	Genre,
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface GenreState {
	list: Genre[];

	searchList: { value: string | number; label: string }[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: GenreState = {
	list: [],
	searchList: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const genreSlice = createSlice({
	name: 'genre',
	initialState: initialState,
	reducers: {
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Genre>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		searchByName: (state, action: PayloadAction<string>) => {
			state.actionLoading = true;
			state.searchList = [];
		},
		searchSuccess: (state, action: PayloadAction<ListResponse<Genre>>) => {
			state.actionLoading = false;
			state.searchList = action.payload.data.map((type, idx) => {
				return {
					value: type.id as string | number,
					label: type.name,
				};
			});
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<Genre>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<Genre>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<Genre>) => {
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
export const genreActions = genreSlice.actions;

// Selectors
export const selectGenreList = (state: RootState) => state.genre.list;
export const selectGenrePagination = (state: RootState) => state.genre.pagination;
export const selectGenreFilter = (state: RootState) => state.genre.filter;
export const selectGenreSearchList = (state: RootState) => state.genre.searchList;

export const selectGenreListLoading = (state: RootState) => state.genre.listLoading;
export const selectGenreActionLoading = (state: RootState) => state.genre.actionLoading;

// Reducer
const genreReducer = genreSlice.reducer;
export default genreReducer;

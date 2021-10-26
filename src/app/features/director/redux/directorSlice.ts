import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	Director,
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface DirectorState {
	list: Director[];

	searchList: Director[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: DirectorState = {
	list: [],
	searchList: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const directorSlice = createSlice({
	name: 'director',
	initialState: initialState,
	reducers: {
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Director>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		searchByName: (state, action: PayloadAction<string>) => {
			state.actionLoading = true;
			state.searchList = [];
		},
		searchSuccess: (state, action: PayloadAction<ListResponse<Director>>) => {
			state.actionLoading = false;
			state.searchList = action.payload.data;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<Director>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<Director>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<Director>) => {
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
export const directorActions = directorSlice.actions;

// Selectors
export const selectDirectorList = (state: RootState) => state.director.list;
export const selectDirectorPagination = (state: RootState) => state.director.pagination;
export const selectDirectorFilter = (state: RootState) => state.director.filter;
export const selectDirectorSearchList = (state: RootState) => state.director.searchList;

export const selectDirectorListLoading = (state: RootState) => state.director.listLoading;
export const selectDirectorActionLoading = (state: RootState) => state.director.actionLoading;

// Reducer
const directorReducer = directorSlice.reducer;
export default directorReducer;

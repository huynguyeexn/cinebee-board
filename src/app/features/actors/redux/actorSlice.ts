import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	Actor,
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface ActorState {
	list: Actor[];

	searchList: Actor[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: ActorState = {
	list: [],
	searchList: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const actorSlice = createSlice({
	name: 'actor',
	initialState: initialState,
	reducers: {
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Actor>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		searchByName: (state, action: PayloadAction<string>) => {
			state.actionLoading = true;
			state.searchList = [];
		},
		searchSuccess: (state, action: PayloadAction<ListResponse<Actor>>) => {
			state.actionLoading = false;
			state.searchList = action.payload.data;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<Actor>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<Actor>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<Actor>) => {
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
export const actorActions = actorSlice.actions;

// Selectors
export const selectActorList = (state: RootState) => state.actor.list;
export const selectActorPagination = (state: RootState) => state.actor.pagination;
export const selectActorFilter = (state: RootState) => state.actor.filter;
export const selectActorSearchList = (state: RootState) => state.actor.searchList;

export const selectActorListLoading = (state: RootState) => state.actor.listLoading;
export const selectActorActionLoading = (state: RootState) => state.actor.actionLoading;

// Reducer
const actorReducer = actorSlice.reducer;
export default actorReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants'
import {
	ComboTicket,
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface ComboTicketState {
    list: ComboTicket[];

    searchList: ComboTicket[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;

    actionLoading: boolean;
}

const initialState: ComboTicketState ={
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false,
}

const comboTicketSlice = createSlice({
    name: 'comboTicket',
    initialState: initialState,
    reducers: {
        getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			console.log(`getList`, action);
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<ComboTicket>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		searchByName: (state, action: PayloadAction<string>) => {
			state.actionLoading = true;
			state.searchList = [];
		},
		searchSuccess: (state, action: PayloadAction<ListResponse<ComboTicket>>) => {
			state.actionLoading = false;
			state.searchList = action.payload.data;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<ComboTicket>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<ComboTicket>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<ComboTicket>) => {
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
    }
});

//Action
export const comboTicketActions = comboTicketSlice.actions;

// Selectors
export const selectComboTicketList = (state: RootState) => state.comboTicket.list;
export const selectComboTicketFilter = (state: RootState) => state.comboTicket.filter;
export const selectComboTicketListLoading = (state: RootState) => state.comboTicket.listLoading;
export const selectComboTicketSearchList = (state: RootState) => state.comboTicket.searchList;

export const selectComboTicketPagination = (state: RootState) => state.comboTicket.pagination;

export const selectComboTicketActionLoading = (state: RootState) => state.comboTicket.actionLoading;
// Reducer
const comboTicketReducer = comboTicketSlice.reducer;
export default comboTicketReducer;
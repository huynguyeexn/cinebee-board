import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { Combo } from 'app/interfaces/combo';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';


export interface ComboState {
    list: Combo[];

    searchList: Combo[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;

    actionLoading: boolean;
}

const initialState: ComboState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false,
};

const comboSlice = createSlice({
    name: 'combo',
    initialState: initialState,
	reducers: {
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			console.log(`getList`, action);
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Combo>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		searchByName: (state, action: PayloadAction<string>) => {
			state.actionLoading = true;
			state.searchList = [];
		},
		searchSuccess: (state, action: PayloadAction<ListResponse<Combo>>) => {
			state.actionLoading = false;
			state.searchList = action.payload.data;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<Combo>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<Combo>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<Combo>) => {
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

//Action
export const comboActions = comboSlice.actions;

// Selectors
export const selectComboList = (state: RootState) => state.combo.list;
export const selectComboFilter = (state: RootState) => state.combo.filter;
export const selectComboListLoading = (state: RootState) => state.combo.listLoading;
export const selectComboSearchList = (state: RootState) => state.combo.searchList;

export const selectComboPagination = (state: RootState) => state.combo.pagination;

export const selectComboActionLoading = (state: RootState) => state.combo.actionLoading;
// Reducer
const comboReducer = comboSlice.reducer;
export default comboReducer;
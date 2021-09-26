import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import { ToastSuccess } from 'app/constants/Toast';
import {
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { Customer } from 'app/interfaces/customer';
import { RootState } from 'app/redux/store';

export interface CustomerState {
	list: Customer[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: CustomerState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const customerSlice = createSlice({
	name: 'customer',
	initialState: initialState,
	reducers: {
		// GET
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Customer>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		getById: (state, action: PayloadAction<Customer>) => {
			state.listLoading = true;
		},
		getByIdSuccess: (state, action: PayloadAction<Customer>) => {
			state.listLoading = false;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<Customer>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<Customer>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<Customer>) => {
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
export const customerActions = customerSlice.actions;

// Selectors
export const selectCustomerList = (state: RootState) => state.customer.list;
export const selectCustomerListLoading = (state: RootState) => state.customer.listLoading;
export const selectCustomerActionLoading = (state: RootState) =>
	state.customer.actionLoading;
export const selectCustomerFilter = (state: RootState) => state.customer.filter;
export const selectCustomerPagination = (state: RootState) => state.customer.pagination;

// Reducer
const customerReducer = customerSlice.reducer;
export default customerReducer;

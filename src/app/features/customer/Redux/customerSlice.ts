import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import { ListParams, ListResponse, PaginationParams } from 'app/interfaces';
import { Customer } from 'app/interfaces/customer';
import { RootState } from 'app/redux/store';

export interface CustomerState {
	list: Customer[];

	filter: ListParams;

	pagination: PaginationParams;

	loading: boolean;
}

const initialState: CustomerState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	loading: false,
};

const customerSlice = createSlice({
	name: 'customer',
	initialState: initialState,
	reducers: {
		fetchCustomerList: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
		},
		fetchCustomerListSuccess: (state, action: PayloadAction<ListResponse<Customer>>) => {
			state.loading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		fetchCustomerError: (state, action: PayloadAction<ListParams>) => {
			state.loading = false;
		},

		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
			state.filter = action.payload;
		},

		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
			state.filter = action.payload;
		},
	},
});

// Actions
export const customerActions = customerSlice.actions;

// Selectors
export const selectCustomerList = (state: RootState) => state.customer.list;
export const selectCustomerLoading = (state: RootState) => state.customer.loading;
export const selectCustomerFilter = (state: RootState) => state.customer.filter;
export const selectCustomerPagination = (state: RootState) => state.customer.pagination;

// Reducer
const customerReducer = customerSlice.reducer;
export default customerReducer;

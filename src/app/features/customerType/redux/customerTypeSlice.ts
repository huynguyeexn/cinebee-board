import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ToastSuccess } from 'app/utils/Toast';
import { CustomerType, ListParams, ListResponse, PaginationParams, SuccessResponse } from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { initFilterParams, initPaginationParams } from 'app/constants';

export interface CustomerTypeState {
	list: CustomerType[];

	searchList: {value: string | number, lable: string}[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: CustomerTypeState = {
	list: [],
	searchList: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const customerTypeSlice = createSlice({
	name: 'CustomerType',
	initialState: initialState,
	reducers: {
		// GET
		getAll: (state) => {
			state.listLoading = true;
		}, 

		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		}, 

		getAllSuccess: (state, action: PayloadAction<ListResponse<CustomerType>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
		},

		// Search
		searchByName: (state, action: PayloadAction<string>) => {
			state.listLoading = true;
			state.searchList = [];
		},

		searchByNameSuccess: (state, action: PayloadAction<ListResponse<CustomerType>>) => {
			state.listLoading = false;
			state.searchList = action.payload.data.map((type, idx) => {
				return {
					value: type.id as string | number,
					lable: type.name
				}
			})
		},

		// Filter
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},

		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<CustomerType>) => {
			state.actionLoading = true;
		},

		update: (state, action: PayloadAction<CustomerType>) => {
			state.actionLoading = true;
		},

		deleteById: (state, action: PayloadAction<CustomerType>) => {
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
export const customerTypeActions = customerTypeSlice.actions;

// Selectors
export const selectCustomerTypeList = (state: RootState) => state.customerType.list;
export const selectCustomerTypeListLoading = (state: RootState) => state.customerType.listLoading;
export const selectCustomerTypeActionLoading = (state: RootState) => state.customerType.actionLoading;
export const selectCustomerTypeFilter = (state: RootState) => state.customerType.filter;
export const selectCustomerTypePagination = (state: RootState) => state.customerType.pagination;
export const selectCustomerTypeSearchList = (state: RootState) => state.customerType.searchList;
export const selectCustomerTypeMap = createSelector(
	selectCustomerTypeList,
	(typeList: CustomerType[]) => {
		return typeList.reduce(
			(map: { [key: string]: CustomerType }, cusType: CustomerType) => {
				map[`${cusType.id}`] = cusType;
				return map;
			},
			{}
		);
	}
);
export const selectCustomerTypeOptions = createSelector(
	selectCustomerTypeList,
	(typeList: CustomerType[]) => {
		return typeList.map((type, idx) => {
			return {
				value: type.id as string | number,
				label: type.name,
			};
		});
	}
);

// Reducer
const customerTypeReducer = customerTypeSlice.reducer;
export default customerTypeReducer;

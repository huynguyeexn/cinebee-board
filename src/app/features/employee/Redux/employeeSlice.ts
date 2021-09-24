import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ToastSuccess } from "app/constants/Toast";
import { ListParams, ListResponse, PaginationParams, SuccessResponse } from "app/interfaces";
import { Employee } from "app/interfaces/employee";
import { RootState } from "app/redux/store";


export interface EmployeeState {
	list: Employee[];

	filter: ListParams;

	pagination: PaginationParams;

	loading: boolean;
}

const initialState: EmployeeState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	loading: false,
};

const employeeSlice = createSlice({
	name: 'employee',
	initialState: initialState,
	reducers: {
		fetchEmployeeList: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
		},
		fetchEmployeeListSuccess: (state, action: PayloadAction<ListResponse<Employee>>) => {
			state.loading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		fetchEmployeeError: (state, action: PayloadAction<ListParams>) => {
			state.loading = false;
		},

		getById: (state, action: PayloadAction<Employee>) => {
			state.loading = true;
		},
		getByIdSuccess: (state, action: PayloadAction<Employee>) => {
			state.loading = false;
		},

		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
			state.filter = action.payload;
		},

		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		deleteById: (state, action: PayloadAction<Employee>) => {
			state.loading = true;
		},
		runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			ToastSuccess(action.payload.message);
			state.loading = false;
		},
		runError: (state) => {
			state.loading = false;
		},
	},
});

// Actions
export const employeeActions = employeeSlice.actions;

// Selectors
export const selectEmployeeList = (state: RootState) => state.employee.list;
export const selectEmployeeLoading = (state: RootState) => state.employee.loading;
export const selectEmployeeFilter = (state: RootState) => state.employee.filter;
export const selectEmployeePagination = (state: RootState) => state.employee.pagination;

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;

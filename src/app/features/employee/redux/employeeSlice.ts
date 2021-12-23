import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import { ToastSuccess } from 'app/utils/Toast';
import { ListParams, ListResponse, PaginationParams, SuccessResponse } from 'app/interfaces';
import { Employee } from 'app/interfaces/employee';
import { RootState } from 'app/redux/store';

export interface EmployeeState {
	list: Employee[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: EmployeeState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const employeeSlice = createSlice({
	name: 'employee',
	initialState: initialState,
	reducers: {
		fetchEmployeeList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},

		fetchEmployeeListSuccess: (state, action: PayloadAction<ListResponse<Employee>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},

		fetchEmployeeError: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = false;
		},
		getAll: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getById: (state, action: PayloadAction<Employee>) => {
			state.listLoading = true;
		},
		getByIdSuccess: (state, action: PayloadAction<Employee>) => {
			state.listLoading = false;
		},

		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},

		create: (state, action: PayloadAction<Employee>) => {
			state.actionLoading = true;
		},

		update: (state, action: PayloadAction<Employee>) => {
			state.actionLoading = true;
		},

		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		deleteById: (state, action: PayloadAction<Employee>) => {
			state.listLoading = true;
		},
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
export const employeeActions = employeeSlice.actions;

// Selectors
export const selectEmployeeList = (state: RootState) => state.employee.list;
export const selectEmployeeListLoading = (state: RootState) => state.employee.listLoading;
export const selectEmployeeActionLoading = (state: RootState) => state.employee.actionLoading;
export const selectEmployeeFilter = (state: RootState) => state.employee.filter;
export const selectEmployeePagination = (state: RootState) => state.employee.pagination;
export const selectEmployeeMap = createSelector(selectEmployeeList, (typeList: Employee[]) => {
	return typeList.reduce((map: { [key: string]: Employee }, empType: Employee) => {
		map[`${empType.id}`] = empType;
		return map;
	}, {});
});
// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;

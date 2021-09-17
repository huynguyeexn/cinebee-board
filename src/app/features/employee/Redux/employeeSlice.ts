import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams } from "app/interfaces";
import { Employee } from "app/interfaces/employee";
import { RootState } from "app/redux/store";

export interface EmployeeState {
    // List employee
    list?: Employee[],

	// Filter
	filter?: ListParams;

	// Pagination
	pagination?: PaginationParams;

	// Loading
	loading: boolean;
}

const initialState: EmployeeState = {
    list: [],
    filter:initFilterParams,
    pagination:initPaginationParams,
    loading:false,
}

const employeeSlice = createSlice({
    name : 'employee',
    initialState : initialState,
    reducers : {
        fetchEmployeeList: (state, action: PayloadAction<ListParams>) => {
            state.loading = true;
        },
        fetchEmployeeSuccess: (state, action: PayloadAction<ListResponse<Employee>>) => {
            state.loading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        fetchEmployeeError: (state, action: PayloadAction<ListParams>) => {
            state.loading = false;
        }
    }
})

//Action
export const employeeActions = employeeSlice.actions;

// Selectors
export const selectEmployeeList = (state: RootState) => state.employee.list;
export const selectEmployeeLoading = (state: RootState) => state.employee.loading;
export const selectEmployeeFilter = (state: RootState) => state.employee.filter;
export const selectEmployeePagination = (state: RootState) => state.employee.pagination;

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
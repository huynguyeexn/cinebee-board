import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { ToastSuccess } from "app/utils/Toast";
import { ListParams, ListResponse, PaginationParams, SuccessResponse } from "app/interfaces";
import { EmployeeRole } from "app/interfaces/employeeRole";
import { RootState } from "app/redux/store";
import { initFilterParams, initPaginationParams } from "app/constants";


export interface EmployeeRoleState {
	list: EmployeeRole[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: EmployeeRoleState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const employeeRoleSlice = createSlice({
	name: 'EmployeeRole',
	initialState: initialState,
	reducers: {
		getAll: (state) => {
			state.listLoading = true;
		},

		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},

		getListSuccess: (state, action: PayloadAction<ListResponse<EmployeeRole>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},

		// Set Filter
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true
			state.filter = action.payload
		},

		setFilterDebounce: (state, action: PayloadAction<ListParams>) =>{},

		create: (state, action: PayloadAction<EmployeeRole>) => {
			state.actionLoading = true
		},

		update: (state, action: PayloadAction<EmployeeRole>) =>{
			state.actionLoading = true;
		},

		deleteById: (state, action: PayloadAction<EmployeeRole>) => {
			state.actionLoading = true
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
		}

	},
});

// Actions
export const employeeRoleActions = employeeRoleSlice.actions;

// Selectors
export const selectEmployeeRoleList = (state: RootState) => state.employeeRole.list;
export const selectEmployeeRolePagination = (state: RootState) => state.employeeRole.pagination;
export const selectEmployeeRoleFilter = (state: RootState) => state.employeeRole.filter;

export const selectEmployeeRoleListLoading = (state: RootState) => state.employeeRole.listLoading;
export const selectEmployeeRoleActionLoading = (state: RootState) => state.employeeRole.actionLoading;
export const selectemployeeRoleMap = createSelector(
	selectEmployeeRoleList,
	(typeList: EmployeeRole[]) => {
		return typeList.reduce(
			(map: { [key: string]: EmployeeRole }, empType: EmployeeRole) => {
				map[`${empType.id}`] = empType;
				return map;
			},
			{}
		);
	}
);
export const selectEmployeeRoleOptions = createSelector(
	selectEmployeeRoleList,
	(typeList: EmployeeRole[]) => {
		return typeList.map((type, idx) => {
			return {
				value: type.id as string | number,
				label: type.name,
			};
		});
	}
);

//  createSelector(selectCityList, (cityList: City[]) => {
// 	return cityList.reduce((map: { [key: string]: City }, city) => {
// 		map[city.code] = city;
// 		return map;
// 	}, {});
// });

// Reducer
const employeeRoleReducer = employeeRoleSlice.reducer;
export default employeeRoleReducer;

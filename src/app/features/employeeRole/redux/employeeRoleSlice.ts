import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	ListParams,
	ListResponse,
	PaginationParams,
	Permissions,
	PermissionsOptions,
	SuccessResponse,
} from 'app/interfaces';
import { EmployeeRole } from 'app/interfaces/employeeRole';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface EmployeeRoleState {
	list: EmployeeRole[];

	permissions: Permissions[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	permissionsLoading: boolean;

	actionLoading: boolean;
}

const initialState: EmployeeRoleState = {
	list: [],
	permissions: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	permissionsLoading: false,
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

		getPermissions: (state) => {
			state.permissionsLoading = true;
		},

		getPermissionsSuccess: (state, action: PayloadAction<ListResponse<Permissions>>) => {
			state.permissionsLoading = false;
			state.permissions = action.payload.data;
		},

		// Set Filter
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},

		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<EmployeeRole>) => {
			state.actionLoading = true;
		},

		update: (state, action: PayloadAction<EmployeeRole>) => {
			state.actionLoading = true;
		},

		deleteById: (state, action: PayloadAction<EmployeeRole>) => {
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
export const employeeRoleActions = employeeRoleSlice.actions;

// Selectors
export const selectEmployeeRoleList = (state: RootState) => state.employeeRole.list;
export const selectEmployeeRolePagination = (state: RootState) => state.employeeRole.pagination;
export const selectEmployeeRoleFilter = (state: RootState) => state.employeeRole.filter;

export const selectEmployeeRoleListLoading = (state: RootState) => state.employeeRole.listLoading;
export const selectEmployeeRoleActionLoading = (state: RootState) =>
	state.employeeRole.actionLoading;
export const selectEmployeeRoleMap = createSelector(
	selectEmployeeRoleList,
	(typeList: EmployeeRole[]) => {
		return typeList.reduce((map: { [key: string]: EmployeeRole }, empType: EmployeeRole) => {
			map[`${empType.id}`] = empType;
			return map;
		}, {});
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

export const selectPermissions = (state: RootState) => state.employeeRole.permissions;
export const selectPermissionsLoading = (state: RootState) => state.employeeRole.permissionsLoading;
export const selectPermissionsOptions = createSelector(
	selectPermissions,
	(permissionsList: Permissions[]) => {
		let options: PermissionsOptions = {};

		const keys = [...Array.from(new Set(permissionsList.map((x) => x.prefix)))];
		keys.forEach((x) => {
			options[x] = permissionsList
				.filter((y) => y.prefix === x)
				.map((z) => ({ value: z.id as number, label: z.name }));
		});

		return options;
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

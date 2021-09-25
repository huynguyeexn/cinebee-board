import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { ToastSuccess } from "app/constants/Toast";
import { ListResponse, SuccessResponse } from "app/interfaces";
import { EmployeeRole } from "app/interfaces/employeeRole";
import { RootState } from "app/redux/store";


export interface EmployeeRoleState {
	list: EmployeeRole[];
	loading: boolean;
}

const initialState: EmployeeRoleState = {
	list: [],
	loading: false,
};

const employeeRoleSlice = createSlice({
	name: 'EmployeeRole',
	initialState: initialState,
	reducers: {
		getAll: (state) => {
			state.loading = true;
		},
		getAllSuccess: (state, action: PayloadAction<ListResponse<EmployeeRole>>) => {
			state.loading = false;
			state.list = action.payload.data;
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
export const employeeRoleActions = employeeRoleSlice.actions;

// Selectors
export const selectEmployeeRoleList = (state: RootState) => state.employeeRole.list;
export const selectEmployeeRoleLoading = (state: RootState) => state.employeeRole.loading;
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

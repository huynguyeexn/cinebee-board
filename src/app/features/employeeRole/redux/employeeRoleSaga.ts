import { call, debounce, put, select, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
// import { PayloadAction } from "@reduxjs/toolkit";
import employeeRoleApi from "app/api/employeeRole";
import { ListParams, ListResponse, SuccessResponse } from "app/interfaces";
import { EmployeeRole } from "app/interfaces/employeeRole";
import { RootState } from "app/redux/store";
import { employeeRoleActions } from "./employeeRoleSlice";


function* getAll() {
	try {
		const response: ListResponse<EmployeeRole> = yield call(employeeRoleApi.getAll);
		yield put(employeeRoleActions.getListSuccess(response));
	} catch (error) {
		yield put(employeeRoleActions.runError);
	}
}

function* getList(action: PayloadAction<ListParams>) {
	try {
		const response: ListResponse<EmployeeRole> = yield call(employeeRoleApi.getList, action.payload);
		yield put(employeeRoleActions.getListSuccess(response));
	} catch (error) {
		yield put(employeeRoleActions.runError);
	}
}

function* deleteById(actions: PayloadAction<EmployeeRole>) {
	try {
		const data: SuccessResponse<EmployeeRole> = yield call(employeeRoleApi.deleteById, actions.payload);
		const filter: ListParams = yield select((state) => state.employeeRole.filter);
		yield put(employeeRoleActions.runSuccess(data));
		yield put(employeeRoleActions.getList(filter));
	} catch (error) {
		yield put(employeeRoleActions.runError());
	}
}

function* create(actions: PayloadAction<EmployeeRole>) {
	try {
		const data: SuccessResponse<EmployeeRole> = yield call(employeeRoleApi.create, actions.payload);
		const filter: ListParams = yield select((state) => state.employeeRole.filter);
		yield put(employeeRoleActions.runSuccess(data));
		yield put(employeeRoleActions.getList(filter));
	} catch (error) {
		yield put(employeeRoleActions.runError());
	}
}

function* update(actions: PayloadAction<EmployeeRole>) {
	try {
		const data: SuccessResponse<EmployeeRole> = yield call(employeeRoleApi.update, actions.payload);
		const filter: ListParams = yield select((state: RootState) => state.employeeRole.filter);
		yield put(employeeRoleActions.runSuccess(data));
		yield put(employeeRoleActions.getList(filter));
	} catch (error) {
		yield put(employeeRoleActions.runError());
	}
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(employeeRoleActions.setFilter(actions.payload));
}

export default function* employeeRoleSaga() {
	yield takeLatest(employeeRoleActions.getAll, getAll);
	yield takeLatest(employeeRoleActions.getList, getList);
	yield takeLatest(employeeRoleActions.create, create);
	yield takeLatest(employeeRoleActions.update, update);
	yield takeLatest(employeeRoleActions.deleteById, deleteById);
	yield takeLatest(employeeRoleActions.setFilter, getList);
	yield debounce(1000, employeeRoleActions.setFilterDebounce, setFilterDebounce);
}

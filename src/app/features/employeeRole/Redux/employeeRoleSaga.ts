import { call, put, takeLatest } from "@redux-saga/core/effects";
import employeeRoleApi from "app/api/employeeRole";
import { ListResponse } from "app/interfaces";
import { EmployeeRole } from "app/interfaces/employeeRole";
import { employeeRoleActions } from "./employeeRoleSlice";


function* getAll() {
	try {
		const response: ListResponse<EmployeeRole> = yield call(employeeRoleApi.getAll);
		yield put(employeeRoleActions.getAllSuccess(response));
	} catch (error) {
		yield put(employeeRoleActions.runError);
	}
}

export default function* employeeRoleSaga() {
	yield takeLatest(employeeRoleActions.getAll, getAll);
}

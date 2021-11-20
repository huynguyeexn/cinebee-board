import { call, debounce, put, select, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import employeeApi from "app/api/employee";
import { ListParams, ListResponse, SuccessResponse } from "app/interfaces";
import { Employee } from "app/interfaces/employee";
import { employeeActions } from "./employeeSlice";


function* fetchEmployeeList(actions: PayloadAction<ListParams>) {
	try {
		const data: ListResponse<Employee> = yield call(employeeApi.getAll);
		yield put(employeeActions.fetchEmployeeListSuccess(data));
	} catch (error) {
		yield put(employeeActions.runError());
	}
}

function* getAll() {
	try {
		const data: ListResponse<Employee> = yield call(employeeApi.getAll);
		yield put(employeeActions.fetchEmployeeListSuccess(data));
	} catch (error) {
		yield put(employeeActions.runError());
	}
}
function* deleteById(actions: PayloadAction<Employee>) {
	try {
		const data: SuccessResponse<Employee> = yield call(
			employeeApi.deleteById,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.employee.filter);
		yield put(employeeActions.runSuccess(data));
		yield put(employeeActions.fetchEmployeeList(filter));
	} catch (error) {
		yield put(employeeActions.runError());
	}
}

function* create(actions: PayloadAction<Employee>) {
	try {
		const data: SuccessResponse<Employee> = yield call(
			employeeApi.create,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.employee.filter);
		yield put(employeeActions.runSuccess(data));
		yield put(employeeActions.fetchEmployeeList(filter));
	} catch (error) {
		yield put(employeeActions.runError());
	}
}

function* update(actions: PayloadAction<Employee>) {
	try {
		const data: SuccessResponse<Employee> = yield call(
			employeeApi.update,
			actions.payload
		);
		const filter: ListParams = yield select((state) => state.employee.filter);
		yield put(employeeActions.runSuccess(data));
		yield put(employeeActions.fetchEmployeeList(filter));
	} catch (error) {
		yield put(employeeActions.runError());
	}
}


function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(employeeActions.setFilter(actions.payload));
}

export default function* employeeSaga() {
	yield takeLatest(employeeActions.fetchEmployeeList, fetchEmployeeList);
	yield takeLatest(employeeActions.setFilter, fetchEmployeeList);
	yield takeLatest(employeeActions.getAll, getAll);
	yield takeLatest(employeeActions.create, create);
	yield takeLatest(employeeActions.update, update);
	yield takeLatest(employeeActions.deleteById, deleteById);
	yield debounce(1000, employeeActions.setFilterDebounce, setFilterDebounce);
}

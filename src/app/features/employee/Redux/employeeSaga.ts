import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import employeeApi from "app/api/employeeApi";
import { ListParams, ListResponse } from "app/interfaces";
import { Employee } from "app/interfaces/employee";
import { employeeActions } from "./employeeSlice";

function* fetchEmployeeList(actions: PayloadAction<ListParams>) {
    try {
        // Gọi API => Lưu vào data
        const data: ListResponse<Employee> = yield call(employeeApi.getAll, actions.payload);

        // Gọi tới fetchEmployeeSuccess
        yield put(employeeActions.fetchEmployeeSuccess(data));
    } catch (error) {
        // In ra lỗi
        console.error('Failed to list employee list: ',error);
        
        // Gọi tới fetchEmployeeError
        yield put(employeeActions.fetchEmployeeError)
    }
}

export default function* employeeSaga(){
    yield takeLatest(employeeActions.fetchEmployeeList, fetchEmployeeList);
}
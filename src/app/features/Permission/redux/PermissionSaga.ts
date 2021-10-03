
import { takeLatest, call, put, debounce } from '@redux-saga/core/effects';
import { PermissionActions } from './PermissionSlide';
import permissionApi from 'app/api/PermissionApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse } from 'app/interfaces';
import { Permission } from 'app/interfaces/Permission';

// Gọi api lấy list permission
function* getList(actions: PayloadAction<ListParams>){
    try {
        // Gọi api lưu vào data
        const data: ListResponse<Permission> = yield call(permissionApi.getAll,actions.payload);
        // put tới hàm getlisstsuccess truyền data vào 
        yield put(PermissionActions.getListsSuccess(data));
    } catch (error) {
        console.error(PermissionActions.runError());
    }
}

function* setFilterDebounce(actions: PayloadAction<ListParams>) {
	yield put(PermissionActions.setFilter(actions.payload));
}

export default function* PermissionSaga(){
    yield takeLatest(PermissionActions.getList, getList);
    yield takeLatest(PermissionActions.setFilter, getList);
    yield debounce(1000, PermissionActions.setFilterDebounce, setFilterDebounce);
}
import roleApi from 'app/api/RoleApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Role, Permission, SuccessResponse } from 'app/interfaces';
import { takeLatest, call, put, debounce, select } from '@redux-saga/core/effects';
import { RoleActions } from './RoleSlide';


function* getList(action: PayloadAction<ListParams>){
    try {
        const data: ListResponse<Role> = yield call(roleApi.getAll,action.payload);
        yield put(RoleActions.getListSuccess(data));
    } catch (error) {
        yield put(RoleActions.runError());
    }
}
function* getListPermission(action: PayloadAction<ListParams>){
    try {
        const data: ListResponse<Permission> = yield call(roleApi.getAllPermission,action.payload);
        yield put(RoleActions.listPermissionSuccess(data));
    } catch (error) {
        yield put(RoleActions.runError());
    }
}
//Thêm mới
function* create(actions: PayloadAction<any>){
    try {
        const data: SuccessResponse<any> = yield call(roleApi.create,actions.payload);
        yield put(RoleActions.runSuccess(data));
    } catch (error) {
        yield put(RoleActions.runError());
    }
}
// update
function* update(action: PayloadAction<any>){
    try {
        const data: SuccessResponse<any> = yield call(roleApi.update,action.payload);
        const filter: ListParams = yield select((state) => state.role.filter);
		yield put(RoleActions.runSuccess(data));
		yield put(RoleActions.getList(filter));
    } catch (error) {
        
    }
}
// xóa
function* deleteById(actions: PayloadAction<any>) {
	try {
		const data: SuccessResponse<any> = yield call(roleApi.deleteById, actions.payload);
		const filter: ListParams = yield select((state) => state.role.filter);
		yield put(RoleActions.runSuccess(data));
		yield put(RoleActions.getList(filter));
	} catch (error) {
		yield put(RoleActions.runError());
	}
}
// set page
function* setFilterDebounce(action: PayloadAction<ListParams>){
    yield put(RoleActions.setFilter(action.payload));
}
export default function* RoleSaga() {
    yield takeLatest(RoleActions.getList,getList);
    yield takeLatest(RoleActions.setFilter,getList);
    yield takeLatest(RoleActions.create,create);
    yield takeLatest(RoleActions.update, update);
    yield takeLatest(RoleActions.deleteById, deleteById);
    yield takeLatest(RoleActions.getListPermission,getListPermission);
    yield debounce(1000,RoleActions.setFilterDebounce, setFilterDebounce);
}
import roleApi from 'app/api/RoleApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Role, Permission, SuccessResponse, permission_role } from 'app/interfaces';
import { takeLatest, call, put, debounce, select } from '@redux-saga/core/effects';
import { RoleActions } from './RoleSlide';
import  employeeRoleApi from 'app/api/employeeRole';


function* getList(action: PayloadAction<ListParams>){
    try {
        const data: ListResponse<Role> = yield call(employeeRoleApi.getList, action.payload);
        yield put(RoleActions.getListSuccess(data));
    } catch (error) {
        yield put(RoleActions.runError());
    }
}
function* getListPermission(){
    try {
        const data: ListResponse<permission_role> = yield call(roleApi.getAllPermission_Role);
        yield put(RoleActions.listPermissionRoleSuccess(data));
    } catch (error) {
        yield put(RoleActions.runError());
    }
}
// get List_permision_role
function* getListPermissionALL(){
    try {
        const data: ListResponse<Permission> = yield call(roleApi.getListPermission);
        yield put(RoleActions.listPermissionSuccess(data));
    } catch (error) {
        yield put(RoleActions.runError());
    }
}
//Thêm mới
function* create(actions: PayloadAction<any>){
    try {
        // const data:
        const data: SuccessResponse<any> = yield call(roleApi.create,actions.payload);
        const pe_role: ListResponse<permission_role> = yield call(roleApi.getAllPermission_Role);
        const role: ListResponse<Role> = yield call(employeeRoleApi.getList, actions.payload);
        yield put(RoleActions.runSuccess(data));
        yield put(RoleActions.listPermissionRoleSuccess(pe_role));
        yield put(RoleActions.getListSuccess(role));
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
    yield takeLatest(RoleActions.getListPermissionALL,getListPermissionALL);
    yield takeLatest(RoleActions.update, update);
    yield takeLatest(RoleActions.deleteById, deleteById);
    yield takeLatest(RoleActions.getListRolePermission,getListPermission);
    yield debounce(1000,RoleActions.setFilterDebounce, setFilterDebounce);
}


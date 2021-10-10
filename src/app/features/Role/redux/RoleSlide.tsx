import { initFilterParams, initPaginationParams } from 'app/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams,Role,PaginationParams,ListResponse, Permission, SuccessResponse } from "app/interfaces";
import { RootState } from 'app/redux/store';



export interface RoleState{
     list: Role[];
     searchList: Role[];
     permission: Permission[];
     filter: ListParams;
     pagination: PaginationParams;
     listLoading: boolean;
     actionLoading: boolean;
}


const initialState: RoleState = {
    list: [],
    searchList: [],
    permission: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false
}

const RoleSlide = createSlice({
    name: 'role',
    initialState: initialState,
    reducers:{
        getList:(state, action: PayloadAction<ListParams>) =>{
            state.listLoading = true;
        },
        getListSuccess: (state, action: PayloadAction<ListResponse<Role>>)=>{
           state.listLoading = false;
           state.list = action.payload.data;
           state.pagination = action.payload.pagination;
        },
        getListPermission: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
        },
        listPermissionSuccess: (state,action: PayloadAction<ListResponse<Permission>>)=>{
            state.listLoading = false;
            state.permission = action.payload.data;
        },
        //Thêm mới
        create: (state, action: PayloadAction<any>) => {
			state.actionLoading = true;
		},
        // set page
        setFilter: (state, action: PayloadAction<ListParams>)=>{
            state.listLoading = true;
            state.filter = action.payload;
        },
        setFilterDebounce: (state, action: PayloadAction<ListParams>)=>{
           state.actionLoading = true;
        },
        // update
        update: (state, action: PayloadAction<any>)=>{
            state.actionLoading = true;
        },
		deleteById: (state, action: PayloadAction<Role>) => {
			state.actionLoading = true;
		},
        runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			state.listLoading = false;
			state.actionLoading = false;
		},
        runError:(state)=>{
            state.listLoading = false;
            state.actionLoading = false;
        }
    }
})

//Action
export const RoleActions = RoleSlide.actions;

//Selector
export const selectRoleList = (state: RootState) => state.role.list;
export const selectRolePagination = (state: RootState) => state.role.pagination;
export const selectRoleFilter = (state: RootState) => state.role.filter;
export const selectPemissionlist = (state: RootState) => state.role.permission;

//loading
export const selectRoleLoading = (state: RootState) => state.role.listLoading;
export const selectRoleActionLoading = (state: RootState) => state.role.actionLoading;


// Reducer
const RoleReducer = RoleSlide.reducer;
export default RoleReducer;
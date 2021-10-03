import { Permission, 

    PaginationParams,
    ListParams,
    ListResponse
} from "app/interfaces";
import { initFilterParams, initPaginationParams } from 'app/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from "fs";
import { RootState } from 'app/redux/store';




export interface PermissionState{
    list: Permission[];
    searchList: Permission[];
    filter: ListParams;
    pagination: PaginationParams;
    listLoading: boolean;
    actionLoading: boolean;
}

const initialState: PermissionState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false
}



const PermissionSlide = createSlice({
    name: 'permission',
    initialState: initialState,
    reducers: {
        getList: (state, action: PayloadAction<ListParams>)=>{
              state.listLoading = true;
        },
        getListsSuccess:(state, action: PayloadAction<ListResponse<Permission>>)=>{
            state.listLoading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
      },
       setFilter: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
            state.filter = action.payload;
       },
       setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},
       runError: (state) => {
        state.listLoading = false;
        state.actionLoading = false;
    },
   }
});
// Actions
export const PermissionActions = PermissionSlide.actions;
// Selectors
export const selectPermissonList = (state: RootState) => state.permission.list;
export const selectPermissonPagination = (state: RootState) => state.permission.pagination;
export const selectPermissonFilter = (state: RootState) => state.permission.filter;
export const selectPermissonSearchList = (state: RootState) => state.permission.searchList;

export const selectPermissonListLoading = (state: RootState) => state.permission.listLoading;
export const selectPermissonActionLoading = (state: RootState) => state.permission.actionLoading;
// Reducer
const permissinReducer = PermissionSlide.reducer;
export default permissinReducer;
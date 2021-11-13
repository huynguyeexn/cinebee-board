
import { Blog, ListParams, PaginationParams, SuccessResponse } from 'app/interfaces';
import { initFilterParams } from './../../../constants/initialConstants';
import { initPaginationParams } from 'app/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastSuccess } from 'app/utils/Toast';
import { RootState } from 'app/redux/store';
import { ListResponse } from './../../../interfaces/common';

export interface BlogState {
    list: Blog[],
    searchList: {values:  string|number,label: string}[];
    filter: ListParams;
    pagination: PaginationParams;
    listLoading: boolean;
    actionLoading: boolean;
}



const initialState: BlogState = {
      list: [],
      searchList: [],
      filter: initFilterParams,
      pagination: initPaginationParams,
      listLoading: false,
      actionLoading: false
}



const BlogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers:{
        //List blog
        ListBlog:(state,action: PayloadAction<ListParams>)=>{
            state.listLoading = true;
        },
        ListBlogSS: (state, aciton: PayloadAction<ListResponse<Blog>>) => {
            state.listLoading = false;
            state.list = aciton.payload.data;
            state.pagination = aciton.payload.pagination;
        },
        create: (state,aciton: PayloadAction<Blog>)=>{
            state.actionLoading = true;
        },
        update: (state, action: PayloadAction<Blog>) => {
			state.actionLoading = true;
		},
        delete: (state,actions: PayloadAction<Blog>)=>{
           state.actionLoading = true;
        },
        setFilter: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
            state.filter = action.payload;
        },
        setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},
        runSuccess: (state, action: PayloadAction<SuccessResponse<any>>)=>{
           state.listLoading = false;
           state.actionLoading = false;
           ToastSuccess(action.payload.message);
        },
        runError: (state) => {
            state.listLoading = false;
            state.actionLoading = false;
        }
    }
});


// Action
export const BlogAction = BlogSlice.actions;


// Selectors

export const SelectBlogList = (state: RootState) => state.blog.list;
export const selectBlogListLoading = (state: RootState) => state.blog.listLoading;
export const SelectBlogActionLoading = (state:  RootState) => state.blog.actionLoading;
export const SelectBlogFilter = (state: RootState) => state.blog.filter;
export const SelectBlogPagination = (state: RootState) => state.blog.pagination;
export const SelectBlogSearchList = (state: RootState) => state.blog.searchList;

//Reducer
const BlogReducer = BlogSlice.reducer;
export default BlogReducer;



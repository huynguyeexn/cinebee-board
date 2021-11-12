import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import {
	ListParams,
	ListResponse,
	PaginationParams,
	SuccessResponse,
} from 'app/interfaces';
import { Item } from 'app/interfaces/item';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface ItemState {
    list: Item[];

    searchList: Item[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;

    actionLoading: boolean;
}

const initialState: ItemState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false,
};


const itemSilce = createSlice ({
    name: 'item',
    initialState: initialState,
    reducers: {
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
        },
        getListSuccess: (state, action: PayloadAction<ListResponse<Item>>) => {
            state.listLoading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        searchByName: (state, action: PayloadAction<string>) => {
            state.actionLoading = true;
            state.searchList = [];
        },
        searchSuccess: (state, action: PayloadAction<ListResponse<Item>>) => {
            state.listLoading = false;
            state.searchList = action.payload.data;
        },

        // SET

        setFilter: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = false;
            state.filter = action.payload;
        },
        setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

        create: (state, action: PayloadAction<Item>) => {
            state.actionLoading = true;
        },
        update: (state, action: PayloadAction<Item>) => {
            state.actionLoading =true;
        },
        deleteById: (state, action: PayloadAction<Item>) => {
            state.actionLoading = true;
        },

        // Handle
        runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
            ToastSuccess(action.payload.message);
            state.listLoading = false;
            state.actionLoading = false;
        },
        runError: (state) => {
            state.listLoading = false;
            state.actionLoading = false
        },
    },
});

//Action
export const itemActions = itemSilce.actions;

// Selectors
export const selectItemList = (state: RootState) => state.item.list;
export const selectItemFilter = (state: RootState) => state.item.filter;
export const selectItemListLoading = (state: RootState) => state.item.listLoading;
export const selectItemSearchList = (state: RootState) => state.item.searchList;

export const selectItemPagination = (state: RootState) => state.item.pagination;

export const selectItemActionLoading = (state: RootState) => state.item.actionLoading;


const itemReducer = itemSilce.reducer;
export default itemReducer;
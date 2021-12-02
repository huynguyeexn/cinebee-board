import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams } from "app/interfaces";
import { Order } from "app/interfaces/order";
import { RootState } from "app/redux/store";

export interface orderState{
    list: Order[];

    searchList: {value: string|number; lable: string}[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;
};

const initialState: orderState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        //GET
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true
        },

        getListSuccess: (state, action: PayloadAction<ListResponse<Order>>) => {
            state.listLoading = false
            state.list = action.payload.data
            state.pagination = action.payload.pagination
        },

        //Search
        searchByName: (state, action: PayloadAction<string>) => {
            state.listLoading = true
            state.searchList = []
        },

        searchSuccess: (state, action: PayloadAction<ListResponse<Order>>) => {
            state.listLoading = false
            state.searchList = action.payload.data.map((type, idx) => {
                return {
                    value: type.id as number|string,
                    lable: type.booking_at as string
                }
            })
        },

        //SET
        setFilter: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true
            state.filter = action.payload
        },

        setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

        runError: (state) => {
            state.listLoading = false
        }
    }
})

//Actions
export const orderActions = orderSlice.actions
//Selectors
export const selectOrderList = (state: RootState) => state.order.list;
export const selectOrderListLoading = (state: RootState) => state.order.listLoading;
export const selectOrderFilter = (state: RootState) => state.order.filter;
export const selectOrderPagination = (state: RootState) => state.order.pagination;
export const selectOrderSearchList = (state: RootState) => state.order.searchList;
//Reducers
const orderReducer = orderSlice.reducer
export default orderReducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams, Payment, SuccessResponse } from "app/interfaces";
import { RootState } from "app/redux/store";
import { ToastSuccess } from "app/utils/Toast";

export interface PaymentState {
    list: Payment[];

    searchList: {value: string|number; lable: string}[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;

    actionLoading: boolean;
}

const initialState: PaymentState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false,
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState: initialState,
    reducers: {
        // GET
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true
        },

        getListSuccess: (state, action: PayloadAction<ListResponse<Payment>>) => {
            state.listLoading = false
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        // SEARCH
        searchByName: (state, action: PayloadAction<string>) => {
            state.listLoading = true;
            state.searchList = [];
        },

        searchSuccess: (state, action: PayloadAction<ListResponse<Payment>>) => {
            state.listLoading = false;
            state.searchList = action.payload.data.map((type, idx) => {
                return {
                    value: type.id as string | number,
                    lable: type.payment_status_id as string,
                }
            })
        },
        // SET
        setFilter: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
            state.filter = action.payload;
        },

        setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

        create: (state, action: PayloadAction<Payment>) => {
            state.actionLoading = true;
        },

        update: (state, action: PayloadAction<Payment>) => {
            state.actionLoading = true;
        },

        deleteById: (state, action: PayloadAction<Payment>) => {
            state.actionLoading = true;
        },

        // HANDLE
        runSuccess: (state, action: PayloadAction<SuccessResponse<Payment>>) => {
            ToastSuccess(action.payload.message);
            state.listLoading = false;
            state.actionLoading = false;
        },

        runError: (state) => {
            state.listLoading = false;
            state.actionLoading = false;
        }
    }
})
// Actions
export const paymentActions = paymentSlice.actions;
// Selectors
export const selectPaymentList = (state: RootState) => state.payment.list;
export const selectPaymentListLoading = (state: RootState) => state.payment.listLoading;
export const selectPaymentActionLoading = (state: RootState) => state.payment.actionLoading;
export const selectPaymentFilter = (state: RootState) => state.payment.filter;
export const selectPaymentPagination = (state: RootState) => state.payment.pagination;
export const selectPaymentSearchList = (state: RootState) => state.payment.searchList;
// Reducer
const paymentReducer = paymentSlice.reducer;
export default paymentReducer;
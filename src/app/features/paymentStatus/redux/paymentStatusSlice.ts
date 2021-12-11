import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams, PaymentStatus, SuccessResponse } from "app/interfaces";
import { RootState } from "app/redux/store";
import { ToastSuccess } from "app/utils/Toast";

export interface paymentStatusState {
    list: PaymentStatus[];

    searchList: {value: string | number, lable: string}[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;

    actionLoading: boolean
}

const initialState: paymentStatusState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false,
}


const paymentStatusSlice = createSlice({
    name: 'paymentStatus',
    initialState: initialState,
    reducers: {
        // GET
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true
        },

        getListSuccess: (state, action: PayloadAction<ListResponse<PaymentStatus>>) => {
            state.listLoading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
        },

        runSuccess: (state, action: PayloadAction<SuccessResponse<PaymentStatus>>) => {
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
export const paymentStatusActions = paymentStatusSlice.actions;
// Selectors
export const selectPatmentStatusList = (state: RootState) => state.paymentStatus.list;
export const selectPaymentStatusListLoading = (state: RootState) => state.paymentStatus.listLoading;
export const selectPaymentStatusActionLoading = (state: RootState) => state.paymentStatus.actionLoading;
export const selectPaymentStatusMap = createSelector(
    selectPatmentStatusList,
    (typeList: PaymentStatus[]) => {
        return typeList.reduce(
            (map: { [key: string]: PaymentStatus }, payStatus: PaymentStatus) => {
                map[`${payStatus.id}`] = payStatus;
                return map
            },{}
        );
    }
)

//Reducer
const paymentStatusReducer = paymentStatusSlice.reducer;
export default paymentStatusReducer;
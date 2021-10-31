import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams } from "app/interfaces";
import { ComboTicket } from "app/interfaces/comboTicket";
import { RootState } from "app/redux/store";

export interface comboTicketState {
    list: ComboTicket[];

    searchList: {value: string|number; lable: string}[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean
}

const initialState: comboTicketState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false
}

const comboTicketSlice = createSlice({
    name: 'comboTicket',
    initialState: initialState,
    reducers: {
        //GET
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true
        },

        getListSuccess: (state, action: PayloadAction<ListResponse<ComboTicket>>) => {
            state.listLoading = false
            state.list = action.payload.data
            state.pagination = action.payload.pagination
        },

        //Search
        searchByName: (state, action: PayloadAction<string>) => {
            state.listLoading = true
            state.searchList = []
        },

        searchSuccess: (state, action: PayloadAction<ListResponse<ComboTicket>>) => {
            state.listLoading = false
            state.searchList = action.payload.data.map((type, idx) => {
                return {
                    value: type.id as number|string,
                    lable: type.get_at as string
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
export const comboTicketActions = comboTicketSlice.actions
//Selectors
export const selectComboTicketList = (state: RootState) => state.comboTicket.list;
export const selectComboTicketListLoading = (state: RootState) => state.comboTicket.listLoading;
export const selectComboTicketFilter = (state: RootState) => state.comboTicket.filter;
export const selectComboTicketPagination = (state: RootState) => state.comboTicket.pagination;
export const selectComboTicketSearchList = (state: RootState) => state.comboTicket.searchList;
//Reducer
const comboTicketReducer = comboTicketSlice.reducer;
export default comboTicketReducer
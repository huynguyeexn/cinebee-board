import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieTicket } from "app/interfaces/movieTicket"
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams } from "app/interfaces";
import { RootState } from "app/redux/store";

export interface movieTicketState {
    list: MovieTicket[];

    searchList: {value: string|number; lable: string}[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;
}

const initialState: movieTicketState = {
    list: [],
    searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
}

const movieTicketSlice = createSlice({
    name: 'movieTicket',
    initialState: initialState,
    reducers: {
        //GET
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true
        },

        getListSuccess: (state, action: PayloadAction<ListResponse<MovieTicket>>) =>{
            state.listLoading = false
            state.list = action.payload.data
            state.pagination = action.payload.pagination
        },

        //SEARCH
        searchByName: (state, action: PayloadAction<string>) => {
            state.listLoading = true
            state.searchList = []
        },

        searchSuccess: (state, action: PayloadAction<ListResponse<MovieTicket>>) => {
            state.listLoading = false
            state.searchList = action.payload.data.map((type, idx) => {
                return {
                    value: type.id as string|number,
                    lable: type.order_id as string
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

// Actions
export const movieTicketActions = movieTicketSlice.actions;
// Selectors
export const selectMovieTicketList = (state: RootState) => state.movieTicket.list;
export const selectMovieTicketListLoading = (state: RootState) => state.movieTicket.listLoading;
export const selectMovieTicketFilter = (state: RootState) => state.movieTicket.filter;
export const selectMovieTicketPagination = (state: RootState) => state.movieTicket.pagination;
export const selectMovieTicketSearchList = (state: RootState) => state.movieTicket.searchList;
// Reducer
const movieTicketReducer = movieTicketSlice.reducer;
export default movieTicketReducer;
import { initFilterParams, initPaginationParams } from './../../../constants/initialConstans';
import { ListParams, PaginationParams, ListResponse } from './../../../interfaces/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from 'app/interfaces/room';
import { RootState } from 'app/redux/store';

export interface RoomState {
    loading: boolean,
    list?: IRoom[],
    filter?: ListParams,
    pagination?: PaginationParams,
}

const initialState: RoomState = {
    loading: false,
    list: [],
    filter: initFilterParams,
    pagination: initPaginationParams
}


const roomSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {
        fetchRoomList: (state, action: PayloadAction<ListParams>) => {
            state.loading = true;
        },
        fetchRoomSuccess: (state, action: PayloadAction<ListResponse<IRoom>>) => {
            state.loading = false;
            state.list = action.payload.data;
            state.pagination= action.payload.pagination;
        },
        fetchRoomError: (state, action: PayloadAction<ListParams>) => {
            state.loading = false;
        },
    }
})

// Acitons
export const roomActions = roomSlice.actions;

// Selectors
export const selectRoomList = (state: RootState) => state.room.list;
export const selectRoomLoading = (state: RootState) => state.room.loading;
export const selectRoomFilter = (state: RootState) => state.room.filter;
export const selectRoomPagination = (state: RootState) => state.room.pagination;

// Reducer
const roomReducer = roomSlice.reducer;
export default roomReducer;
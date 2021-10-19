import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams, SuccessResponse } from "app/interfaces";
import { Showtime } from "app/interfaces/showtime";
import { RootState } from "app/redux/store";
import { ToastSuccess } from "app/utils/Toast";

export interface ShowtimeState {
    list: Showtime[];

	filter: ListParams;

	pagination: PaginationParams;

	listLoading: boolean;

	actionLoading: boolean;
}

const initialState: ShowtimeState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const showtimeSlice = createSlice({
    name: "showtime",
    initialState: initialState,
    reducers: {
        getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Showtime>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},

		// Handle
		runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			ToastSuccess(action.payload.message);
			state.listLoading = false;
			state.actionLoading = false;
		},
		runError: (state) => {
			state.listLoading = false;
			state.actionLoading = false;
		},
    }
})

// Actions
export const showtimeActions = showtimeSlice.actions;

// Selectors
export const selectShowtimeList = (state: RootState) => state.showtime.list;
export const selectShowtimePagination = (state: RootState) => state.showtime.pagination;
export const selectShowtimeFilter = (state: RootState) => state.showtime.filter;

export const selectShowtimeListLoading = (state: RootState) => state.showtime.listLoading;
export const selectShowtimeActionLoading = (state: RootState) => state.showtime.actionLoading;


// Reducer
const showtimeReducer = showtimeSlice.reducer;
export default showtimeReducer;
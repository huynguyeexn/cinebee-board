import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFilterParams, initPaginationParams } from 'app/constants';
import { ListParams, ListResponse, PaginationParams, Room, SuccessResponse } from 'app/interfaces';
import { RootState } from 'app/redux/store';
import { ToastSuccess } from 'app/utils/Toast';

export interface RoomState {
	list: Room[];
	filter: ListParams;
	pagination: PaginationParams;
	listLoading: boolean;
	actionLoading: boolean;
}

const initialState: RoomState = {
	list: [],
	filter: initFilterParams,
	pagination: initPaginationParams,
	listLoading: false,
	actionLoading: false,
};

const roomSlice = createSlice({
	name: 'room',
	initialState: initialState,
	reducers: {
		getList: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
		},
		getListSuccess: (state, action: PayloadAction<ListResponse<Room>>) => {
			state.listLoading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},

		// SET
		setFilter: (state, action: PayloadAction<ListParams>) => {
			state.listLoading = true;
			state.filter = action.payload;
		},
		setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

		create: (state, action: PayloadAction<Room>) => {
			state.actionLoading = true;
		},
		update: (state, action: PayloadAction<Room>) => {
			state.actionLoading = true;
		},
		deleteById: (state, action: PayloadAction<Room>) => {
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
			state.actionLoading = false;
		},
	},
});
// Actions
export const roomActions = roomSlice.actions;

// Selector
export const selectRoomList = (state: RootState) => state.room.list;
export const selectRoomPagination = (state: RootState) => state.room.pagination;
export const selectRoomFilter = (state: RootState) => state.room.filter;

export const selectRoomListLoading = (state: RootState) => state.room.listLoading;
export const selectRoomActionLoading = (state: RootState) => state.room.actionLoading;

// Reducer
const roomReducer = roomSlice.reducer;
export default roomReducer;

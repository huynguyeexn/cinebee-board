import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initFilterParams, initPaginationParams } from "app/constants";
import { ListParams, ListResponse, PaginationParams, SuccessResponse } from "app/interfaces";
import { Category } from "app/interfaces/category";
import { RootState } from "app/redux/store";
import { ToastSuccess } from "app/utils/Toast";

export interface CategoryState {
    list: Category[];

	searchList: { value: string | number; label: string }[];

    filter: ListParams;

    pagination: PaginationParams;

    listLoading: boolean;

    actionLoading: boolean;
}

const initialState: CategoryState = {
    list: [],
	searchList: [],
    filter: initFilterParams,
    pagination: initPaginationParams,
    listLoading: false,
    actionLoading: false
}

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        // GET
        getList: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
        },

        getListSuccess: (state, action: PayloadAction<ListResponse<Category>>) => {
            state.listLoading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
        },

		searchByName: (state, action: PayloadAction<string>) => {
			state.actionLoading = true;
			state.searchList = [];
		},

		searchSuccess: (state, action: PayloadAction<ListResponse<Category>>) => {
			state.actionLoading = false;
			state.searchList = action.payload.data.map((type, idx) => {
				return {
					value: type.id as string | number,
					label: type.name,
				};
			});
		},

        getById: (state, action: PayloadAction<Category>) => {
            state.listLoading = true;
        },

        getByIdSuccess: (state, action: PayloadAction<Category>) => {
            state.listLoading = false;
        },

        setFilter: (state, action: PayloadAction<ListParams>) => {
            state.listLoading = true;
            state.filter = action.payload;
        },

        setFilterDebounce: (state, action: PayloadAction<ListParams>) => {},

        create: (state, action: PayloadAction<Category>) =>{
            state.actionLoading = true;
        },

        update: (state, action: PayloadAction<Category>) => {
            state.actionLoading = true;
        },

        deleteById: (state, action: PayloadAction<Category>) => {
            state.actionLoading = true;
        },

        // Handle

        runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
            state.listLoading = false;
            state.actionLoading = false;
            ToastSuccess(action.payload.message);
        },

        runError: (state) => {
            state.listLoading = false;
            state.actionLoading = false;
        }
    }

})

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectCategoryList = (state: RootState) => state.category.list;
export const selectCategoryListLoading = (state: RootState) => state.category.listLoading;
export const selectCategoryActionLoadding = (state: RootState) => state.category.actionLoading;
export const selectCategoryFilter = (state: RootState) => state.category.filter;
export const selectCategoryPagination = (state: RootState) => state.category.pagination;
export const selectCategorySearchList = (state: RootState) => state.category.searchList;

//Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer
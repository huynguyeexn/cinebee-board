import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ToastSuccess } from 'app/utils/Toast';
import { CustomerType, ListResponse, SuccessResponse } from 'app/interfaces';
import { RootState } from 'app/redux/store';

export interface CustomerTypeState {
	list: CustomerType[];
	loading: boolean;
}

const initialState: CustomerTypeState = {
	list: [],
	loading: false,
};

const customerTypeSlice = createSlice({
	name: 'CustomerType',
	initialState: initialState,
	reducers: {
		getAll: (state) => {
			state.loading = true;
		},
		getAllSuccess: (state, action: PayloadAction<ListResponse<CustomerType>>) => {
			state.loading = false;
			state.list = action.payload.data;
		},
		runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			ToastSuccess(action.payload.message);
			state.loading = false;
		},
		runError: (state) => {
			state.loading = false;
		},
	},
});

// Actions
export const customerTypeActions = customerTypeSlice.actions;

// Selectors
export const selectCustomerTypeList = (state: RootState) => state.customerType.list;
export const selectCustomerTypeLoading = (state: RootState) => state.customerType.loading;
export const selectCustomerTypeMap = createSelector(
	selectCustomerTypeList,
	(typeList: CustomerType[]) => {
		return typeList.reduce(
			(map: { [key: string]: CustomerType }, cusType: CustomerType) => {
				map[`${cusType.id}`] = cusType;
				return map;
			},
			{}
		);
	}
);
export const selectCustomerTypeOptions = createSelector(
	selectCustomerTypeList,
	(typeList: CustomerType[]) => {
		return typeList.map((type, idx) => {
			return {
				value: type.id as string | number,
				label: type.name,
			};
		});
	}
);

// Reducer
const customerTypeReducer = customerTypeSlice.reducer;
export default customerTypeReducer;
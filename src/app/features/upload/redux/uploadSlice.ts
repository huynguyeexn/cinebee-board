import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { ImageUpload, SuccessResponse } from 'app/interfaces';
import { RootState } from 'app/redux/store';

export interface UploadState {
	imagesUpload: ImageUpload[];
	loading: boolean;
	uploadSuccess: boolean;
}

const initialState: UploadState = {
	imagesUpload: [],
	loading: false,
	uploadSuccess: false,
};

const uploadSlice = createSlice({
	name: 'upload',
	initialState: initialState,
	reducers: {
		uploadImages: (state, action: PayloadAction<UploadFile[]>) => {
			state.uploadSuccess = false;
			state.loading = true;
		},
		uploadSuccess: (state, action: PayloadAction<ImageUpload[]>) => {
			message.success('Tệp của bạn đã tải lên thành công');
			state.loading = false;
			state.uploadSuccess = true;
			state.imagesUpload = action.payload;
		},

		// Handle
		runSuccess: (state, action: PayloadAction<SuccessResponse<any>>) => {
			message.success('Tệp của bạn đã tải lên thành công');
			state.uploadSuccess = true;
			state.loading = false;
		},
		runError: (state) => {
			state.uploadSuccess = false;
			state.loading = false;
		},
	},
});

// Actions
export const uploadActions = uploadSlice.actions;

// Selectors
export const selectUploadLoading = (state: RootState) => state.upload.loading;
export const selectUploadSuccess = (state: RootState) => state.upload.uploadSuccess;
export const selectImageUpload = (state: RootState) => state.upload.imagesUpload;

// Reducer
const uploadReducer = uploadSlice.reducer;
export default uploadReducer;

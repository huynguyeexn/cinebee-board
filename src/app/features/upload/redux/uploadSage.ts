import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { UploadFile } from 'antd/lib/upload/interface';
import fileUploadApi from 'app/api/fileUploadApi';
import { ImageUpload } from 'app/interfaces';
import { uploadActions } from './uploadSlice';

interface responseInterface<T> {
	data: T[];
}

function* uploadImages(action: PayloadAction<UploadFile[]>) {
	try {
		const data: responseInterface<ImageUpload> = yield call(
			fileUploadApi.image,
			action.payload
		);
		yield put(uploadActions.uploadSuccess(data.data));
	} catch (error) {
		yield put(uploadActions.runError);
	}
}

export default function* uploadSaga() {
	yield takeLatest(uploadActions.uploadImages, uploadImages);
}

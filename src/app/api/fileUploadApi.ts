import { UploadFile } from 'antd/lib/upload/interface';
import { RcFile } from 'antd/lib/upload';
import axiosClient from './axiosClient';

const endpoint = '/uploads';

const fileUploadApi = {
	image(fileList: UploadFile[]): Promise<any> {
		const formData = new FormData();

		fileList.forEach((file: UploadFile, idx) => {
			formData.append('images[]', file?.originFileObj as RcFile);
		});

		return axiosClient.post(endpoint + '/images', formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
	},
};

export default fileUploadApi;

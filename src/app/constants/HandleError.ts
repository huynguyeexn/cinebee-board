import { AxiosError } from 'axios';
import { ToastError } from './Toast';

export const HandleAxiosError = (error: AxiosError) => {
	if (error.response?.status === 404) {
		ToastError('Không tìm thấy dữ liệu');
	} else {
		ToastError(error.response?.statusText || error.message);
	}
};

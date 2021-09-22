import { AxiosError } from 'axios';
import { ToastError } from './Toast';

export const HandleAxiosError = (error: AxiosError) => {
	if (error.response?.status === 404) {
		return ToastError('Không tìm thấy dữ liệu');
	} else {
		return ToastError(error.response?.statusText || error.message);
	}
};

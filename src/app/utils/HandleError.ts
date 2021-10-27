import { AxiosError } from 'axios';
// import { ToastError } from './Toast';

export const HandleAxiosError = (error: AxiosError) => {
	// try {
	// 	if (error.response?.status) {
	// 		switch (error.response.status) {
	// 			case 404:
	// 				return ToastError('Không tìm thấy dữ liệu');
	// 			case 403:
	// 				return ToastError('Bạn không được quyền thao tác hành động này!');
	// 			default:
	// 				break;
	// 		}
	// 	}
	// 	if (error.response?.data.message) {
	// 		return ToastError(error.response.data.message);
	// 	}
	// 	return ToastError(error.response?.statusText || error.message);
	// } catch (error) {
	// 	console.error('log', error);
	// }
};

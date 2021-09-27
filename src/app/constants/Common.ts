import { ToastOptions } from 'react-toastify';

export const DATE_FORMAT: string = 'DD/MM/YYYY';

export const TOAST_CONFIG: ToastOptions<{}> = {
	position: 'bottom-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const IMAGE_TYPE_ACCEPT: string[] = [
	'image/png',
	'image/jpg',
	'image/jpeg',
	'image/svg',
	'image/gif',
	'image/webp',
];

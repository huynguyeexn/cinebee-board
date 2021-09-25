import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '.';

export const ToastDefault = (label: string) => {
	toast(label, TOAST_CONFIG);
};

export const ToastSuccess = (label: string) => {
	toast.success(label, TOAST_CONFIG);
};

export const ToastWarning = (label: string) => {
	toast.warning(label, TOAST_CONFIG);
};

export const ToastError = (label: string) => {
	toast.error(label, TOAST_CONFIG);
};

export const ToastInfo = (label: string) => {
	toast.info(label, TOAST_CONFIG);
};

import { Customer, IBase } from '.';

export interface Order extends IBase {
	total: number|string;
	booking_at: number | string;
	employee_id: number | string;
	customer_id: number | string;
	customer: Customer;
}
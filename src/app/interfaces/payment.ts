import { IBase } from '.';

export interface Payment extends IBase {
	booking_at: Date;
	payment_status_id: number | string;
	employee_id: number | string;
	customer_id: number | string;
	combo_ticket_id: number | string;
	movie_ticket_id: number | string;
}
import { IBase } from './base';

export interface Seat extends IBase {
	index: string;
	label: string;
	room_id: number | string;
	seat_status_id?: number;
	customer_username?: string;
	customer_id?: number;
}

import { IBase } from './base';
export interface Room extends IBase {
	name: string;
	room_status_id: number | string;
	rows: number;
	cols: number;
	seats: string | number[][];
}

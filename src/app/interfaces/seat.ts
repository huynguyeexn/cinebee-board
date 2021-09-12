import { IBase } from './base';

export interface ISeat extends IBase {
	name: string;
	row: number;
	col: number;
	room_id: number | string;
	seat_status_id: 1;
}

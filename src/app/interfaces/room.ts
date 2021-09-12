import { IBase } from './base';
export interface IRoom extends IBase {
	name: string;
	room_status_id: number | string;
}

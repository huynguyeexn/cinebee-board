import { IBase } from '.';

export interface Item extends IBase {

	name: string;
	price: number;
	slug: string;
}
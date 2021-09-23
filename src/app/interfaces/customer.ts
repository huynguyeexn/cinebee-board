import { IBase } from '.';

export interface Customer extends IBase {
	fullname: string;
	username: string;
	phone: string;
	email: string;
	address: string;
	birthday: number | string;
	sex: 0 | 1 | 2;
	customer_type_id: number | null;
}

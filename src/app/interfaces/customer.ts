import { IBase } from '.';

export interface Customer extends IBase {
	fullname: string;
	username: string;
	password: string;
	phone: string;
	email: string;
	address: string;
	birthday: Date;
	sex: 0 | 1 | string;
	customer_type_id: number | null;
}

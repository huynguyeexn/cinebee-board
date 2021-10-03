import { IBase } from '.';

export interface Actor extends IBase {
	fullname: string;
	avatar: string;
	slug: string;
}

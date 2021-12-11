import { EmployeeRole, IBase } from '.';
import { Permissions } from './permissions';

export interface Employee extends IBase {
	fullname: string;
	username: string;
	password?: string;
	phone: string;
	email: string;
	address: string;
	id_card: string;
	birthday: number | string | Date;
	gender: 0 | 1 | 2;
	employee_role_id: number | string;
	permissions: string[];
	permissions_full: Permissions[];
	role: EmployeeRole;
}

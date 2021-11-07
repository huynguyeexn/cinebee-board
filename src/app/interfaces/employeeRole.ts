import { IBase } from '.';
import { Permissions } from '.';

export interface EmployeeRole extends IBase {
	name: string;
	code: string;
	permissions: string[];
	permissions_full: Permissions[];
}

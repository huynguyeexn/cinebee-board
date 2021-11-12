import { IBase } from '.';
import { Permissions } from './permissions';

export interface EmployeeRole extends IBase {
	name: string;
	code: string;
	permissions: string[];
	permissions_full: Permissions[];
}

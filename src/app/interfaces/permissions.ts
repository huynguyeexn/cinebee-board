import { IBase } from '.';

export interface Permissions extends IBase {
	display_name: string;
	name: string;
	prefix: string;
}

export interface PermissionsOptions {
	[key: string]: { value: number; label: string }[];
}

import { IBase } from '.';

export interface ImageUpload extends IBase {
	name: string;
	file_name: string;
	type: string;
	alt: string;
	size: string;
	folder: string;
}

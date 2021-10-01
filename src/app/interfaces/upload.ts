import { UploadFile } from 'antd/lib/upload/interface';
import { IBase } from '.';

export interface ImageUpload extends UploadFile<any> {
	id: string | number;
	file_name: string;
	type: string;
	alt: string;
	folder: string;
}

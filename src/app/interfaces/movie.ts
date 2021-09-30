import { UploadFile } from 'antd/lib/upload/interface';
import { IBase, ImageUpload } from '.';

export interface Movie extends IBase {
	name: string;
	slug?: string;
	trailer: string;
	likes: string;
	description: string;
	release_date: string;
	running_time: string;
	age_rating_id: string;
	posters: ImageUpload[] | UploadFile<any>[] | number[];
	backdrops: ImageUpload[] | UploadFile<any>[] | number[];
}

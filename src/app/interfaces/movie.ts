import { UploadFile } from 'antd/lib/upload/interface';
import { Actor, Genre, IBase, ImageUpload } from '.';

export interface Movie extends IBase {
	name: string;
	slug?: string;
	trailer: string;
	likes: string;

	description: string;
	release_date: string;
	running_time: string;
	age_rating_id: string;

	// Request
	posters: (UploadFile<any> | number)[];
	backdrops: (UploadFile<any> | number)[];
	actors: number[];
	genres: number[];

	// Response
	posters_full: ImageUpload[];
	backdrops_full: ImageUpload[];
	actors_full?: Actor[];
	genres_full?: Genre[];
}

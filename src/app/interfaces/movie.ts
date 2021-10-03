import { UploadFile } from 'antd/lib/upload/interface';
import { Actor, Director, Genre, IBase, ImageUpload } from '.';

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
	directors: number[];
	genres: number[];

	// Response
	posters_full: ImageUpload[];
	backdrops_full: ImageUpload[];
	actors_full?: Actor[];
	directors_full?: Director[];
	genres_full?: Genre[];
}

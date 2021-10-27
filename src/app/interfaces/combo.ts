import { UploadFile } from 'antd/lib/upload/interface';
import { IBase, ImageUpload, Item } from '.';

export interface Combo extends IBase {
	name: string;
	price: number;
	slug: string;
	description: string;

	// Request
	imgcombos: (UploadFile<any> | number)[];

	// Reponse
	imgcombos_full: ImageUpload[];
	combos_full?: Combo[];
	items_full?: Item[];
}

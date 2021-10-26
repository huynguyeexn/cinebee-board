import { IBase, Item } from '.';

export interface Combo extends IBase {

	name: string;
	price: number;
	slug: string;

	//reponse
	combos_full?: Combo[];
	items_full?: Item[];
}

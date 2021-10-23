import { Combo, IBase } from '.';

export interface ComboTicket extends IBase {
    get_at: string;
    price: number;
    combo_id: number;

}
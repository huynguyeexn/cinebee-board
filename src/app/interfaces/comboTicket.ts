import { IBase } from '.';

export interface ComboTicket extends IBase {
    get_at: string | Date,
    quantity: string | number,
    price: number,
    order_id: number | string,
    combo_id: number | string,
}
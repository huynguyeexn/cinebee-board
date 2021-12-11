import { IBase } from '.';

export interface MovieTicket extends IBase {
    get_at: string | Date,
    price: number,
    order_id: number | string,
    showtime_id: number | string,
    room_id: number | string,
    seat_id: number | string
}
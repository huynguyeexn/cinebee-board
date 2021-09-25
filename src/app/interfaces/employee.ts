import { IBase } from '.';

export interface Employee extends IBase {
    fullname: string,
    username: string,
    password: string,
    phone: string,
    email: string,
    address: string,
    id_card: string,
    birthday: number | string | Date,
    sex: 0 | 1 | 2,
    employee_role_id: number | string,
}

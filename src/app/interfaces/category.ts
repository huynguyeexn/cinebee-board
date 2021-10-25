import { IBase } from '.';

export interface Category extends IBase {
    name: string;
    slug: string;
    show: number;
}
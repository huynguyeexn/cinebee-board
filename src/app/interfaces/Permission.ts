import { IBase } from './base';

export interface Permisssion extends IBase{
    name: string;
    display_name: string;
    prefix: string;
}
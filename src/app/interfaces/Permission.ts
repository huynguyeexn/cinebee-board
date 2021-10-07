import { IBase } from './base';

export interface Permission extends IBase{
    name: string;
    display_name: string;
    prefix: string;
}
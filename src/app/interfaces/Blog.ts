import { IBase } from '.';
import { ImageUpload } from './upload';
import { UploadFile } from 'antd/lib/upload/interface';


export interface Blog extends IBase {
   title: string;
   summary: string;
   views: number;
   date: Date;
   show: number;
   content: string;
   slug: string;
   category_id: number;
   background: ImageUpload[];
   // Request
	background_rq: (UploadFile<any> | number)[];
   employee_id: number;
}
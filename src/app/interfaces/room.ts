export interface IRoom{
    id?:number | string,
    name:string,
    room_status_id:number | string,

    deleted_at?:number,
    created_at?:number,
    updated_at?:number,
}
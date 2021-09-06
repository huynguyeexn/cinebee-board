export interface PaginationParams {
    total: number,
    query?: string| null,
    last_page: number
    page: number,
    per_page: number,
    sort_by: string,
    sort_type: "desc"|"asc",
}

export interface ListResponse<T> {
    data: T[];
    pagination: PaginationParams
}

export interface ListParams {
    page?: number,
    per_page?: number,
    sort_by?: string,
    sort_type?: "desc"|"asc",
    q?: string| null,
}
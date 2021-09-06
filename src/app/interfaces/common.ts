export interface PaginationParams {
    total: number,
    query: string,
    last_page: number
    page: number,
    per_page: number,
    sort_by: number,
    sort_type: number,
}

export interface ListResponse<T> {
    data: T[];
    pagination: PaginationParams
}

export interface ListParams {
    page?: number,
    per_page?: number,
    sort_by?: number,
    sort_type?: number,
    q?: string,
}
export interface ListResponse<T> {
	data: T[];
	pagination: PaginationParams;
}

export interface PaginationParams {
	total: number;
	query?: string | null;
	last_page: number;
	page: number;
	per_page: number;
	sort_by: string;
	sort_type: 'desc' | 'asc';
}

export interface ListParams {
	page?: number;
	per_page?: number;
	sort_by?: string;
	sort_type?: 'desc' | 'asc';
	q?: string | null;
	search?: string;
	filter?: string;
	filter_by?: string;
}

export interface SuccessResponse<T> {
	message: string;
	data: T;
}

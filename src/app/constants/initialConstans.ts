import { ListParams, PaginationParams } from './../interfaces/common';

export const initFilterParams: ListParams = {
	page: 1,
	per_page: 10,
	sort_by: 'updated_at',
	sort_type: 'desc',
	q: null,
};

export const initPaginationParams: PaginationParams = {
	total: 0,
	query: null,
	last_page: 0,
	page: 0,
	per_page: 0,
	sort_by: 'updated_at',
	sort_type: 'desc',
};

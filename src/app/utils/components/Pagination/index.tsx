import { Pagination } from 'antd';
import React from 'react';
import locale from 'antd/lib/locale/vi_VN';

interface Props {
	page?: number;
	total?: number;
	onPageChange: (page: number, pageSize?: number) => void;
}

export const AppPagination = ({ page, total, onPageChange }: Props) => {
	return (
		<div style={{ textAlign: 'center' }}>
			<Pagination
				locale={locale.Pagination}
				defaultCurrent={page}
				current={page}
				onChange={onPageChange}
				total={total}
				showSizeChanger
				showQuickJumper
				showTotal={(total, range) => `Từ ${range[0]}-${range[1]} trên ${total} dòng`}
				pageSizeOptions={['5', '10', '20', '50', '100']}
				defaultPageSize={10}
			/>
		</div>
	);
};

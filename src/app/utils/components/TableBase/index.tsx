import { Col, Row, Table } from 'antd';
import { PaginationParams } from 'app/interfaces';
import React from 'react';
import { AppPagination } from '../Pagination';

interface Props {
	columns: any;
	dataSource: any;
	pagination: PaginationParams;
	loading: boolean;
	onPageChange: (page: number, pageSize?: number) => void;
}

const TableBase = ({ columns, dataSource, pagination, loading, onPageChange }: Props) => {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Table
					loading={loading}
					pagination={false}
					columns={columns}
					dataSource={dataSource}
					rowKey="id"
					size="small"
					scroll={{ x: 1500 }}
					showSorterTooltip={true}
				/>
			</Col>
			<Col span={24}>
				<AppPagination
					page={+pagination.page}
					total={+pagination.total}
					onPageChange={onPageChange}
				/>
			</Col>
		</Row>
	);
};

export default TableBase;

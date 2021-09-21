import { Col, Row, Table } from 'antd';
import FilterCustomer from 'app/features/customer/dashboard/components/FilterCustomer';
import { PaginationParams } from 'app/interfaces';
import React from 'react';
import { AppPagination } from '../Pagination';

interface Props {
	columns: any;
	dataSource: any;
	pagination: PaginationParams;
	loading: boolean;
	onPageChange: (page: number, pageSize?: number) => void;
	isFilter?: boolean;
}

const TableBase = ({
	columns,
	dataSource,
	pagination,
	loading,
	isFilter = false,
	onPageChange,
}: Props) => {
	return (
		<Row gutter={[16, 16]}>
			{isFilter && (
				<Col span={24}>
					<FilterCustomer searchType={columns} />
				</Col>
			)}
			<Col span={24}>
				<Table
					loading={loading}
					pagination={false}
					columns={columns}
					dataSource={dataSource}
					rowKey="id"
					size="small"
					scroll={{ x: 1500 }}
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

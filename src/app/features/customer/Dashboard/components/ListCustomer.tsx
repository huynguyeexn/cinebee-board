import { PaginationParams } from 'app/interfaces';
import { Customer } from 'app/interfaces/customer';
import TableBase from 'app/utils/components/TableBase';
import React from 'react';

interface Props {
	onPageChange: (page: number, pageSize?: number) => void;
	customers: Customer[];
	columns: any;
	pagination: PaginationParams;
	loading: boolean;
}

const ListCustomer = ({
	customers,
	columns,
	pagination,
	loading,
	onPageChange,
}: Props) => {
	return (
		customers && (
			<TableBase
				columns={columns}
				dataSource={customers}
				pagination={pagination}
				onPageChange={onPageChange}
				loading={loading}
			/>
		)
	);
};

export default ListCustomer;

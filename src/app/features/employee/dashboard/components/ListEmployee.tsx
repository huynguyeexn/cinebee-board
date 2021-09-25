import { PaginationParams } from "app/interfaces";
import { Employee } from "app/interfaces/employee";
import TableBase from "app/utils/components/TableBase";

interface Props {
	onPageChange: (page: number, pageSize?: number) => void;
	employees: Employee[];
	columns: any;
	pagination: PaginationParams;
	loading: boolean;
}

const ListEmployee = ({
	employees,
	columns,
	pagination,
	loading,
	onPageChange,
}: Props) => {
	return (
		employees && (
			<TableBase
				columns={columns}
				dataSource={employees}
				pagination={pagination}
				onPageChange={onPageChange}
				loading={loading}
			/>
		)
	);
};

export default ListEmployee;

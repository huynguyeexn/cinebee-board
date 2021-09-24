import { Col, Input, Row, Form, Select} from "antd";
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
import { AiOutlineSearch } from "react-icons/ai";
import React, { ChangeEvent } from "react";
import { employeeActions, selectEmployeeFilter } from "../../Redux/EmployeeSlice";


const { Option } = Select;

interface searchType {
	title: string;
	key: string;
	[key: string]: any;
}

interface Props {
	searchType: searchType[];
}

const FilterEmployee = ({ searchType }: Props) => {
	const dispatch = useAppDispatch();
	const filter = useAppSelector(selectEmployeeFilter);

	const [searchBy, setSearchBy] = React.useState<string>(searchType[0].key);

	React.useEffect(() => {
		if (filter.q) {
			const newFilter = {
				...filter,
				q: filter.q,
				search: searchBy,
			};

			dispatch(employeeActions.setFilterDebounce(newFilter));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchBy]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const newFilter = {
			...filter,
			q: value,
			search: searchBy,
		};

		dispatch(employeeActions.setFilterDebounce(newFilter));
	};

	return (
		<Row gutter={16}>
			<Col span={12}>
				<Form layout="vertical">
					<Form.Item label="Tìm kiếm" name="search" style={{ marginBottom: 0 }}>
						<Input.Group compact>
							<Select onChange={setSearchBy} value={searchBy} style={{ width: '30%' }}>
								{searchType.slice(0, -1).map((type) => (
									<Option key={type.key} value={type.key}>
										{type.title}
									</Option>
								))}
							</Select>
							<Input
								style={{ width: '70%' }}
								placeholder="Từ khóa tìm kiếm..."
								suffix={<AiOutlineSearch />}
								onChange={handleSearchChange}
							/>
						</Input.Group>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default FilterEmployee;

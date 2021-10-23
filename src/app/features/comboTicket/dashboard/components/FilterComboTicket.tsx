import { Col, Input, Row, Form } from "antd";
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
import Select from "rc-select";
import React, { ChangeEvent } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { comboTicketActions, selectComboTicketFilter } from "../../redux/comboTicketSlice";

const { Option } = Select;

interface searchType {
    title: string;
    key: string;
}

const FilterComboTicket = () => {
    const searchType: searchType[] = [
        {
            title: 'Combo Ticket',
            key: 'name',
        },
        {
            title: 'ID',
            key: 'id',
        }
    ];

    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectComboTicketFilter);

	const [searchBy, setSearchBy] = React.useState<string>(searchType[0].key);
    
	React.useEffect(() => {
		if (filter.q) {
			const newFilter = {
				...filter,
				q: filter.q,
				search: searchBy,
			};

			dispatch(comboTicketActions.setFilterDebounce(newFilter));
		}
	}, [searchBy]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const newFilter = {
			...filter,
			q: value,
			search: searchBy,
		};

		dispatch(comboTicketActions.setFilterDebounce(newFilter));
	}
	return (
	<Row gutter={16} style={{ width: '100%' }}>
				<Col sm={24} md={12}>
					<Form layout="vertical">
						<Form.Item label="Tìm kiếm" name="search" style={{ marginBottom: 0 }}>
							<Input.Group compact>
								<Select onChange={setSearchBy} value={searchBy} style={{ width: '120px' }}>
									{searchType.map((type) => (
										//phải gọi option ra để nó nhận
										<Option key={type.key} value={type.key}>
											{type.title}
										</Option>
									))}
								</Select>
								<Input
									style={{ width: 'auto' }}
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

export default FilterComboTicket;
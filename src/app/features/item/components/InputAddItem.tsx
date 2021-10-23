import { Button, Col, Form, Popconfirm, Row, Select, Spin } from 'antd';
import { Item } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import {
	itemActions,
	selectItemActionLoading,
	selectItemSearchList,
} from '../redux/itemSilce';

const { Option } = Select;

interface Props {
	name: string;
	control: Control;
	data?: Item[];
};

const InputAddItem = ({ name, control, data, }: Props) => {
	const dispatch = useAppDispatch();
	const selectSearchList = useAppSelector(selectItemSearchList);
	const actionLoading = useAppSelector(selectItemActionLoading);

	const [options, setOptions] = React.useState<any>([]);
	const [value, setValue] = React.useState<number>();
	const [itemSelected, setItemSelected] = React.useState<Item[]>(data || []);

	const {
		field: { onChange },
	} = useController<any>({ name, control });

	React.useEffect(() => {
		const element =
		selectSearchList?.map((item) =>(
			<Option
				key={`search-actor-${item.id}`}
				value={item.id as number}
				style={{ display: 'flex', alignItems: 'center' }}
				label={item.name}
			>
				{/* <Avatar shape="square" src={item.avatar} style={{ marginRight: '8px' }} /> */}
				{item.name}
			</Option>
		)) || [];
		setOptions(element);
	}, [selectSearchList]);

	const handleSearch = (name: string) => {
		if (name) {
			dispatch(itemActions.searchByName(name));
		}
	};

	const handleAddItem = () => {
		if (!selectSearchList.length || !itemSelected) return;

		const selected: Item = selectSearchList.filter(
			(item: Item) => (item.id as number) === value
		)[0];

		if (itemSelected.find((item) => item.id === selected.id)) return;
		const result = [...itemSelected, selected];
		const idList = result.map((item) => item.id);
		onChange(idList);
		setItemSelected(result);
	}

	const handleDelete = (item: Item) => {
		const result = itemSelected?.filter((value) => value.id !== item.id);
		setItemSelected(result);
	};

	const tableColumns = [
		{
			title: 'id',
			dataIndex: 'id',
		},
		{
			title: 'Tên Sản Phẩm',
			dataIndex: 'name',
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (text: string, record: Item) =>
				itemSelected ? (
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
						<AiOutlineDelete />
					</Popconfirm>
				) : null,
		},
	];
	
	return (
		<Row gutter={[16, 16]}>
			<Col span={16}>
				<Form.Item label="Đồ ăn" name={name}>
					<Select
						optionLabelProp="label"
						allowClear
						showSearch
						value={value}
						placeholder={'Nhập tên sản phẩm cần tìm...'}
						defaultActiveFirstOption={false}
						notFoundContent={actionLoading ? <Spin size="small" /> :null }
						showArrow={false}
						filterOption={false}
						onSearch={handleSearch}
						onChange={(value) => {
							setValue(value);
						}}
					>
						{options}
					</Select>
				</Form.Item>
			</Col>
			<Col span={6}>
				<Form.Item label="&nbsp;">
						<Button onClick={handleAddItem}>Thêm sản phẩm</Button>
				</Form.Item>
			</Col>
			<Col span={24}>
						<TableBase
						columns={tableColumns}
						dataSource={itemSelected} loading={false} />

			</Col>
		</Row>
	);
};

export default InputAddItem;